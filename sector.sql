-- phpMyAdmin SQL Dump
-- version 3.5.1
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1
-- Время создания: Июн 16 2022 г., 22:24
-- Версия сервера: 5.5.25
-- Версия PHP: 5.3.13

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `sector`
--

-- --------------------------------------------------------

--
-- Структура таблицы `tokens`
--

CREATE TABLE IF NOT EXISTS `tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `refreshToken` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `tokens`
--

INSERT INTO `tokens` (`id`, `userId`, `refreshToken`, `createdAt`, `updatedAt`) VALUES
(1, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0MkBtYWlsLnJ1IiwiZmlyc3ROYW1lIjoi0JrQuNGA0LjQu9C7IiwibGFzdE5hbWUiOm51bGwsImdlbmRlciI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyMi0wNi0xNlQxMzoyNjozNy4wMDBaIiwiaWF0IjoxNjU1Mzg2MDgxLCJleHAiOjE2NTUzODYxMTF9.Z', '2022-06-16 13:26:37', '2022-06-16 13:28:01'),
(2, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0MkBtYWlsLnJ1IiwiZmlyc3ROYW1lIjoi0JrQuNGA0LjQu9C7IiwibGFzdE5hbWUiOm51bGwsImdlbmRlciI6Im1hbGUiLCJjcmVhdGVkQXQiOiIyMDIyLTA2LTE2VDEzOjI1OjEwLjAwMFoiLCJpYXQiOjE2NTU0MDI3NTcsImV4cCI6MTY1NTUxMDc1N3', '2022-06-16 18:03:04', '2022-06-16 18:05:57');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `gender` enum('male','female') DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `gender`, `createdAt`, `updatedAt`) VALUES
(1, 'Кирилл', NULL, 'test2@mail.ru', '$2b$04$QNg9F.3x9YqBl3odjQLITOlVhgCVFednxAcKg.kODTCCsVtANmB4C', 'male', '2022-06-16 13:25:10', '2022-06-16 17:35:17'),
(2, 'Виталий', NULL, 'test2@mail.ru', '$2b$04$dxfBdXV0xjCBcNyHCLZJpe0kjM0bqqHS0thzErKk4O578twNNiHe.', 'male', '2022-06-16 13:26:37', '2022-06-16 17:34:46');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
