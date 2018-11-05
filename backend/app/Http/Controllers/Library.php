<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\WatchedFilmsUser;

class Library extends Controller
{
    public function loadItems(Request $request) {
        $language = $request->lang === "en" ? "&language=en-US" : "&language=ru-RU";

        $genresLegend = json_decode(file_get_contents("https://api.themoviedb.org/3/genre/movie/list?api_key=1dc667ca439220e3356ddd92cdee3e5e" . $language));
        $genresToFilter = '&with_genres=';
        $filterGenres = $request->filter["genres"];

        if (count($filterGenres) !== 0 && ($filterGenres[0] !== "all" && $filterGenres[0] !== "все")) {
            foreach($genresLegend->genres as $item) {
                foreach($filterGenres as $search) {
                    if ($item->name === ucfirst($search)) {
                        $genresToFilter = $genresToFilter . $item->id . '|';
                    }
                }
            }
        }

        if ($request->sort === 'name') {
            $sort = '&sort_by=original_title.asc';
        } else if ($request->sort === 'rating') {
            $sort = '&sort_by=popularity.desc';
        } else {
            $sort = '&sort_by=primary_release_date.asc';
        }

        $page = '&page=' . $request->page;

        if ($request->filter['imdb'] !== null && $request->filter['imdb'] !== 'any') {
            $rating = '&vote_average.gte=' . $request->filter['imdb'];
        } else {
            $rating = '&vote_average.gte=1';
        }

        $yearmin = '&primary_release_date.gte=' . $request->filter['yearGap']['min'];
        $yearmax = '&primary_release_date.lte=' . $request->filter['yearGap']['max'];

        $url = "https://api.themoviedb.org/3/discover/movie/?api_key=1dc667ca439220e3356ddd92cdee3e5e" . $language . $sort . $genresToFilter . $yearmin . $yearmax . $rating . $page;
        $contents = json_decode(file_get_contents($url));
        $result = [];
        foreach ($contents->results as $movie) {
            //to convert genres from int values to words
            $currentGenres = [];
            if (count($movie->genre_ids) !== 0) {
                foreach($movie->genre_ids as $genre_id) {
                    foreach($genresLegend->genres as $item) {
                        if ($item->id === intval($genre_id, 10)) {
                            array_push($currentGenres, $item->name);
                        }
                    }
                }
            } else {
                $currentGenres = $request->lang === 'en' ? 'No info' : 'Нет данных';
            }
            //to get all watched movies by this user
            $user = auth()->guard('api')->user();
            $filmsArray = WatchedFilmsUser::select('id_film')->where('id_user', $user->id)->get();
            $watched = [];
            foreach ($filmsArray as $val) {
                array_push($watched, $val["id_film"]);
            }
            array_push($result, [
                'poster' => $movie->poster_path !== null ? 'https://image.tmdb.org/t/p/w500' . $movie->poster_path : './pics/No_image_poster.png',
                'year' => substr($movie->release_date, 0, 4),
                'id' => $movie->id,
                'name' => $movie->title,
                'genre' => $currentGenres,
                'imdb' => $movie->vote_average,
                'seen' => in_array($movie->id, $watched)
            ]);
        }

        return response()->json([
            'data' => $result,
            'hasMore' => $request->page < $contents->total_pages,
            'url' => $url
        ], 200);
    }

    public function loadMovieDetails(Request $request) {
        $language = $request->lang === "en" ? "&language=en-US" : "&language=ru-RU";
        $details = json_decode(file_get_contents('https://api.themoviedb.org/3/movie/' . $request->id . "?api_key=1dc667ca439220e3356ddd92cdee3e5e" . $language));
        $countries = [];
        foreach($details->production_countries as $country){
            array_push($countries, $country->name);
        }
        $imdb_details = json_decode(file_get_contents('http://www.omdbapi.com/?apikey=1b966a3b&i=' . $details->imdb_id));
        if (!property_exists($imdb_details, 'Response')) {
            $result = [
                'imdb_id' => $details->imdb_id,
                'title' => $details->title,
                'year' => substr($details->release_date, 0, 4),
                'runtime' => $details->runtime !== null ? $details->runtime : $request->lang === 'en' ? 'No info' : 'Нет данных',
                'rating' => $details->vote_average,
                'plot' => $details->overview !== "" ? $details->overview : $request->lang === 'en' ? 'No info' : 'Нет данных',
                'poster' => $details->poster_path !== null ? 'https://image.tmdb.org/t/p/w500' . $details->poster_path : './pics/No_image_poster.png',
                'country' => $countries,
                'director' => $imdb_details->Director,
                'actors' => $imdb_details->Actors,
            ];
        } else {
            $result = [
                'imdb_id' => $details->imdb_id,
                'title' => $details->title,
                'year' => substr($details->release_date, 0, 4),
                'runtime' => $details->runtime !== null ? $details->runtime : $request->lang === 'en' ? 'No info' : 'Нет данных',
                'rating' => $details->vote_average,
                'plot' => $details->overview !== "" ? $details->overview : $request->lang === 'en' ? 'No info' : 'Нет данных',
                'poster' => $details->poster_path !== null ? 'https://image.tmdb.org/t/p/w500' . $details->poster_path : './pics/No_image_poster.png',
                'country' => $countries,
                'director' => $request->lang === 'en' ? 'No info' : 'Нет данных',
                'actors' => $request->lang === 'en' ? 'No info' : 'Нет данных',
            ];
        }

        return response()->json([
            'data' => $result
        ], 200);
    }

    public function loadItemsByTitle(Request $request) {
        $language = $request->lang === 'en' ? '&language=en-US' : '&language=ru-RU';

        $genresLegend = json_decode(file_get_contents("https://api.themoviedb.org/3/genre/movie/list?api_key=1dc667ca439220e3356ddd92cdee3e5e" . $language));

        $page = '&page=' . $request->page;

        $url = "https://api.themoviedb.org/3/search/movie/?api_key=1dc667ca439220e3356ddd92cdee3e5e" . $language . "&query=" . $request->title . $page;
        $contents = json_decode(file_get_contents($url));
        $result = [];
        foreach ($contents->results as $movie) {
            //to convert genres from int values to words
            $currentGenres = [];
            if (count($movie->genre_ids) !== 0) {
                foreach($movie->genre_ids as $genre_id) {
                    foreach($genresLegend->genres as $item) {
                        if ($item->id === intval($genre_id, 10)) {
                            array_push($currentGenres, $item->name);
                        }
                    }
                }
            } else {
                $currentGenres = $request->lang === 'en' ? 'No info' : 'Нет данных';
            }
            //to get all watched movies by this user
            $user = auth()->guard('api')->user();
            $filmsArray = WatchedFilmsUser::select('id_film')->where('id_user', $user->id)->get();
            $watched = [];
            foreach ($filmsArray as $val) {
                array_push($watched, $val["id_film"]);
            }
            array_push($result, [
                'poster' => $movie->poster_path !== null ? 'https://image.tmdb.org/t/p/w500' . $movie->poster_path : './pics/No_image_poster.png',
                'year' => substr($movie->release_date, 0, 4),
                'id' => $movie->id,
                'name' => $movie->title,
                'genre' => $currentGenres,
                'imdb' => $movie->vote_average,
                'seen' => in_array($movie->id, $watched)
            ]);
        }

        return response()->json([
            'data' => $result,
            'hasMore' => $request->page < $contents->total_pages,
            'url' => $url
        ], 200);
    }
}
