<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Library extends Controller
{
    public function loadItems(Request $request)
    {
        /* have 
        page: int 0 - infinity
        sort: name/raiting/year
        order: asc/desc,
        filter: {
            imdb: null/1-9,
            genres: []/['action', 'drama', etc],
            yearGap: { min: 1910/'1910', max: 2018/'2018'}
        }
        */
        $baseUrl = "https://tv-v2.api-fetch.website/movies/" . $request->page . '?';
        $sortType = "sort=" . $request->sort;
        $orderParam = $request->order === 'asc' ? "&order=1" : "&order=-1";
        if ($request->filter['genres'] !== 'all') {
            $genres = '&genre=all';
        } else {
            $genres = '&genre=' . $request->filter['genres'];
        }
        $url = $baseUrl . $sortType . $orderParam . $genres;
        $contents = json_decode(file_get_contents($url));
        $result = [];
        foreach ($contents as $key => $value) {
            // $imdbRait = json_decode(file_get_contents('http://www.omdbapi.com/?apikey=1b966a3b&i='.$value->imdb_id));
            if ($value->year !== null) {
                $year = $value->year;
            } else {
                if ($request->lang === 'en') {
                    $year = 'No info';
                } else {
                    $year = 'Нет данных';
                }
            }
            if (count($value->genres) !== 0) {
                $genres = $value->genres;
            } else {
                if ($request->lang === 'en') {
                    $genres = 'No info';
                } else {
                    $genres = 'Нет данных';
                }
            }
            if (!array_key_exists('images', (array)$value) || empty((array)$value->images)) {
                $poster = './pics/No_image_poster.png';
            } else {
                $poster = $value->images->poster;
            }
            array_push($result, 
                [
                    'poster' => $poster,
                    'year' => $year,
                    'id' => $value->imdb_id,
                    'name' => $value->title,
                    'genre' => $genres,
                    'imdb' => 100500,
                ]
                // array_key_exists('images', (array)$value)
            );
        }
        $total = json_decode(file_get_contents("https://tv-v2.api-fetch.website/movies"));
        $length = count($total);
        $totalLength = explode('/', $total[$length - 1]);
        $totalRes = intval($totalLength[1]);
        if($contents !== false){
            return response()->json([
                'data' => $result,
                'totalPages' => $totalRes,
                'filterParam' => $url
            ], 200);
        }
    }
}
