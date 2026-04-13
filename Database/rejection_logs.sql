-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 13, 2026 at 12:45 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `adoption_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `rejection_logs`
--

CREATE TABLE `rejection_logs` (
  `id` int(11) NOT NULL,
  `donation_id` int(11) NOT NULL,
  `reason` varchar(255) NOT NULL,
  `proof_path` varchar(255) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `rejected_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rejection_logs`
--

INSERT INTO `rejection_logs` (`id`, `donation_id`, `reason`, `proof_path`, `notes`, `rejected_at`) VALUES
(7, 31, 'Amount Mismatch', 'receipt-1776010688176.png', '', '2026-04-12 16:18:08'),
(8, 15, 'Blurry Screenshot', NULL, '', '2026-04-12 16:18:45'),
(9, 30, 'Invalid Reference No.', NULL, 'Ikaw at Ako', '2026-04-12 16:22:32'),
(10, 16, 'Invalid Reference No.', NULL, '', '2026-04-12 16:39:11'),
(11, 12, 'Amount Mismatch', 'receipt-1776012850457.JPG', '', '2026-04-12 16:54:10'),
(12, 12, 'Invalid Reference No.', NULL, '', '2026-04-13 10:07:46'),
(13, 31, 'Invalid Reference No.', NULL, '', '2026-04-13 10:43:24');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `rejection_logs`
--
ALTER TABLE `rejection_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `donation_id` (`donation_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `rejection_logs`
--
ALTER TABLE `rejection_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `rejection_logs`
--
ALTER TABLE `rejection_logs`
  ADD CONSTRAINT `rejection_logs_ibfk_1` FOREIGN KEY (`donation_id`) REFERENCES `donations` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
