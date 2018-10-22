-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Хост: localhost:3306
-- Время создания: Окт 22 2018 г., 09:11
-- Версия сервера: 5.7.22
-- Версия PHP: 7.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `app`
--
CREATE DATABASE IF NOT EXISTS `app` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `app`;

-- --------------------------------------------------------

--
-- Структура таблицы `comments_to_films`
--

CREATE TABLE `comments_to_films` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_film` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_user` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `comments_to_films`
--

INSERT INTO `comments_to_films` (`id`, `id_film`, `id_user`, `comment`, `created_at`, `updated_at`) VALUES
(1, '20', '2', 'djfdsfdsjkl', '2018-10-09 21:00:00', '2018-10-09 21:00:00'),
(2, '20', '17', 'djfdsfdsjkldasadsads', '2018-10-09 21:00:00', '2018-10-09 21:00:00'),
(3, '20', '19', 'dsadsadsa]dsf[]dfs;\'.431123', '2018-10-09 21:00:00', '2018-10-09 21:00:00'),
(4, '11', '17', 'dsadsadsa]dsf[]dfs;\'.431123dsaads', '2018-10-09 21:00:00', '2018-10-09 21:00:00'),
(7, '11', '1', 'adsdsadsadas', '2018-10-11 09:37:07', '2018-10-11 09:37:07');

-- --------------------------------------------------------

--
-- Структура таблицы `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2016_06_01_000001_create_oauth_auth_codes_table', 1),
(4, '2016_06_01_000002_create_oauth_access_tokens_table', 1),
(5, '2016_06_01_000003_create_oauth_refresh_tokens_table', 1),
(6, '2016_06_01_000004_create_oauth_clients_table', 1),
(7, '2016_06_01_000005_create_oauth_personal_access_clients_table', 1),
(8, '2018_10_10_132305_create_keep_comments_to_films_table', 1),
(9, '2018_10_17_120145_watched_films_user', 2),
(10, '2018_10_22_083807_create_users_watched_films_one_month', 3),
(11, '2014_10_12_000000_create_users_table', 4);

-- --------------------------------------------------------

--
-- Структура таблицы `oauth_access_tokens`
--

CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `client_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `oauth_access_tokens`
--

INSERT INTO `oauth_access_tokens` (`id`, `user_id`, `client_id`, `name`, `scopes`, `revoked`, `created_at`, `updated_at`, `expires_at`) VALUES
('07d2db73cb4b2f178b07c4c54faad537600a217bffd9a1393e64b2a77ebe0c54e4e14ee26a05b800', 1, 3, 'Personal Access Token', '[]', 0, '2018-10-22 12:34:16', '2018-10-22 12:34:16', '2019-10-22 15:34:16'),
('22a7a062b798565643504de52c8ce9b62a85914526cdcffd9e9f7229a9dafadda5a9c52308691e02', 1, 1, 'Personal Access Token', '[]', 0, '2018-10-11 08:05:45', '2018-10-11 08:05:45', '2019-10-11 11:05:45');

-- --------------------------------------------------------

--
-- Структура таблицы `oauth_auth_codes`
--

CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `oauth_clients`
--

CREATE TABLE `oauth_clients` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `redirect` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `oauth_clients`
--

INSERT INTO `oauth_clients` (`id`, `user_id`, `name`, `secret`, `redirect`, `personal_access_client`, `password_client`, `revoked`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Laravel Personal Access Client', 'e886VjvGGBOWFx31UuqDvTMBGEZKjBjGKO5iKd9t', 'http://localhost', 1, 0, 0, '2018-10-11 08:05:34', '2018-10-11 08:05:34'),
(2, NULL, 'Laravel Password Grant Client', 'gSz44ObxecYBohq6o4O4mBpEtr5mjymmsvbRnyGe', 'http://localhost', 0, 1, 0, '2018-10-11 08:05:34', '2018-10-11 08:05:34'),
(3, NULL, 'Laravel Personal Access Client', 'MZxKW4MV6i9O1CuiI36lVSv5LL8lB6DMEmEp4WPn', 'http://localhost', 1, 0, 0, '2018-10-17 09:23:16', '2018-10-17 09:23:16'),
(4, NULL, 'Laravel Password Grant Client', '27uJK1Cd4oN5TYeYiOGZMlDJeG2ho7K66b8kBl5u', 'http://localhost', 0, 1, 0, '2018-10-17 09:23:16', '2018-10-17 09:23:16');

-- --------------------------------------------------------

--
-- Структура таблицы `oauth_personal_access_clients`
--

CREATE TABLE `oauth_personal_access_clients` (
  `id` int(10) UNSIGNED NOT NULL,
  `client_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `oauth_personal_access_clients`
--

INSERT INTO `oauth_personal_access_clients` (`id`, `client_id`, `created_at`, `updated_at`) VALUES
(1, 1, '2018-10-11 08:05:34', '2018-10-11 08:05:34'),
(2, 3, '2018-10-17 09:23:16', '2018-10-17 09:23:16');

-- --------------------------------------------------------

--
-- Структура таблицы `oauth_refresh_tokens`
--

CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `password_resets`
--

CREATE TABLE `password_resets` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `activation_token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider_id` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `access_token` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `firstname`, `lastname`, `email`, `email_verified_at`, `password`, `active`, `activation_token`, `avatar`, `provider`, `provider_id`, `access_token`, `remember_token`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'valera', 'vas9', 'pet9', 'korotkovsergey96@gmail.com', NULL, '$2y$10$hmYtukk/Xvu..M4fMn9XM.LS4CpoYhAJrOcAbNTEfT5Rl8QjajANK', 1, '', NULL, NULL, NULL, NULL, NULL, '2018-10-22 12:33:19', '2018-10-22 12:33:49', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `users_watched_films_one_months`
--

CREATE TABLE `users_watched_films_one_months` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_film` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users_watched_films_one_months`
--

INSERT INTO `users_watched_films_one_months` (`id`, `id_film`, `created_at`, `updated_at`) VALUES
(1, '25', '2018-10-22 06:53:24', '2018-10-22 06:53:24'),
(2, '15', '2018-10-22 06:53:39', '2018-10-22 06:53:39'),
(3, '48', '2018-10-22 06:53:42', '2018-10-22 06:53:42'),
(4, '22', '2018-10-22 06:53:46', '2018-10-22 06:53:46'),
(5, '10', '2018-10-22 06:53:49', '2018-10-22 06:53:49'),
(6, '8', '2018-10-22 06:55:32', '2018-10-22 06:55:32'),
(7, '13', '2018-10-22 06:55:35', '2018-09-05 06:55:35'),
(8, '88', '2018-10-22 06:55:37', '2018-10-22 06:55:37'),
(9, '101', '2018-10-22 06:55:40', '2018-09-04 06:55:40'),
(10, '23', '2018-10-22 06:55:43', '2018-10-22 06:55:43'),
(11, '534', '2018-10-22 06:55:45', '2018-10-22 06:55:45'),
(12, '423', '2018-10-22 06:55:48', '2018-10-22 06:55:48'),
(13, '86', '2018-10-22 06:55:53', '2018-10-22 06:55:53'),
(14, '956', '2018-10-22 06:56:10', '2018-10-22 06:56:10');

-- --------------------------------------------------------

--
-- Структура таблицы `watched_films_users`
--

CREATE TABLE `watched_films_users` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_film` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_user` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `watched_films_users`
--

INSERT INTO `watched_films_users` (`id`, `id_film`, `id_user`, `created_at`, `updated_at`) VALUES
(4, '33', '1', '2018-10-17 09:44:19', '2018-10-19 11:27:26'),
(8, '66', '1', '2018-10-19 11:26:19', '2018-10-19 11:26:19'),
(9, '21', '1', '2018-10-19 11:26:25', '2018-10-19 11:26:25'),
(10, '12', '1', '2018-10-19 11:26:29', '2018-10-19 11:26:29'),
(11, '48', '1', '2018-10-19 11:27:41', '2018-10-19 11:27:41'),
(13, '15', '1', '2018-10-19 12:30:25', '2018-10-19 12:30:25'),
(16, '11', '2', '2018-10-19 15:35:10', '2018-10-19 15:35:10'),
(17, '24', '2', '2018-10-19 15:35:10', '2018-10-16 15:35:10'),
(18, '19', '2', '2018-10-19 15:35:13', '2018-10-15 15:35:13'),
(19, '18', '2', '2018-10-19 15:35:13', '2018-10-19 15:35:13');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `comments_to_films`
--
ALTER TABLE `comments_to_films`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `oauth_access_tokens`
--
ALTER TABLE `oauth_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_access_tokens_user_id_index` (`user_id`);

--
-- Индексы таблицы `oauth_auth_codes`
--
ALTER TABLE `oauth_auth_codes`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `oauth_clients`
--
ALTER TABLE `oauth_clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_clients_user_id_index` (`user_id`);

--
-- Индексы таблицы `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_personal_access_clients_client_id_index` (`client_id`);

--
-- Индексы таблицы `oauth_refresh_tokens`
--
ALTER TABLE `oauth_refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`);

--
-- Индексы таблицы `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `password_resets_email_index` (`email`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Индексы таблицы `users_watched_films_one_months`
--
ALTER TABLE `users_watched_films_one_months`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `watched_films_users`
--
ALTER TABLE `watched_films_users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `comments_to_films`
--
ALTER TABLE `comments_to_films`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT для таблицы `oauth_clients`
--
ALTER TABLE `oauth_clients`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `oauth_personal_access_clients`
--
ALTER TABLE `oauth_personal_access_clients`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `password_resets`
--
ALTER TABLE `password_resets`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `users_watched_films_one_months`
--
ALTER TABLE `users_watched_films_one_months`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT для таблицы `watched_films_users`
--
ALTER TABLE `watched_films_users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
