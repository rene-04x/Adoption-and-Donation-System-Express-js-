-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 10, 2026 at 08:32 PM
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
-- Table structure for table `donations`
--

CREATE TABLE `donations` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `donor_name` varchar(255) NOT NULL,
  `type` enum('Cash','In-Kind') NOT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `item_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `ref_no` varchar(100) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `receipt_img` varchar(255) DEFAULT NULL,
  `status` enum('pending','received','rejected') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donations`
--

INSERT INTO `donations` (`id`, `user_id`, `donor_name`, `type`, `amount`, `item_name`, `email`, `phone`, `payment_method`, `ref_no`, `date`, `receipt_img`, `status`) VALUES
(6, 10, 'Irene Espeleta', 'Cash', 20.00, NULL, NULL, NULL, 'GCash', '1234567898765', '2026-04-10 17:06:45', 'receipt-1775840805591.png', 'pending'),
(9, 10, 'Irene Espeleta', 'Cash', 50.00, NULL, NULL, NULL, 'GCash', '2345433333333', '2026-04-10 17:23:11', 'receipt-1775841791289.png', 'pending'),
(11, 10, 'Irene Espeleta', 'Cash', 700.00, 'Purpose: needed_most', NULL, NULL, 'GCash', '5555555555555', '2026-04-10 17:44:30', 'receipt-1775843070350.png', 'pending'),
(12, 10, 'Irene Espeleta', 'Cash', 577.00, 'Purpose: needed_most', NULL, NULL, 'GCash', '5555555555555', '2026-04-10 17:45:11', 'receipt-1775843111504.png', 'pending'),
(13, 10, 'Irene Espeleta', '', NULL, 'dog food', 'irespeleta@my.cspc.edu.ph', '09767567555', NULL, NULL, '2026-04-10 17:49:39', NULL, 'pending'),
(14, 10, 'Irene Espeleta', 'Cash', 5.00, 'Purpose: General', NULL, NULL, 'GCash', '5555555555555', '2026-04-10 17:54:46', 'receipt-1775843685847.png', 'pending'),
(15, 10, 'Irene Espeleta', 'Cash', 56.00, 'Purpose: medical', NULL, NULL, 'GCash', '5555555555555', '2026-04-10 17:56:07', 'receipt-1775843767017.png', 'pending'),
(16, 10, 'Irene Espeleta', '', NULL, 'cat food', 'irespeleta@my.cspc.edu.ph', '09434444444', NULL, NULL, '2026-04-10 17:56:56', NULL, 'pending');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `donations`
--
ALTER TABLE `donations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `donations`
--
ALTER TABLE `donations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `donations`
--
ALTER TABLE `donations`
  ADD CONSTRAINT `donations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
