-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 10, 2026 at 07:00 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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
CREATE DATABASE IF NOT EXISTS `adoption_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `adoption_db`;

-- --------------------------------------------------------

--
-- Table structure for table `animals`
--

CREATE TABLE `animals` (
  `animal_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `species` enum('Dog','Cat') NOT NULL,
  `gender` enum('Male','Female','Unknown') DEFAULT 'Unknown',
  `breed` varchar(100) DEFAULT NULL,
  `age_months` int(11) DEFAULT NULL,
  `color_markings` text DEFAULT NULL,
  `behavior_traits` text DEFAULT NULL,
  `current_status` varchar(255) DEFAULT NULL,
  `rescue_date` date DEFAULT NULL,
  `rescue_area` varchar(255) DEFAULT NULL,
  `rescue_story` text DEFAULT NULL,
  `profile_photo` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `animals`
--

INSERT INTO `animals` (`animal_id`, `name`, `species`, `gender`, `breed`, `age_months`, `color_markings`, `behavior_traits`, `current_status`, `rescue_date`, `rescue_area`, `rescue_story`, `profile_photo`, `created_at`) VALUES
(1, 'Adobo', 'Dog', 'Female', NULL, NULL, 'brown and white on extremities & end of tail', 'Friendly', 'given birth to seven puppies last August 04, 2025', '2025-07-10', NULL, NULL, NULL, '2026-04-10 16:22:59');

-- --------------------------------------------------------

--
-- Table structure for table `animal_medical_history`
--

CREATE TABLE `animal_medical_history` (
  `med_id` int(11) NOT NULL,
  `animal_id` int(11) DEFAULT NULL,
  `treatment_name` varchar(255) DEFAULT NULL,
  `date_administered` date DEFAULT NULL,
  `administered_by` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `animal_medical_history`
--

INSERT INTO `animal_medical_history` (`med_id`, `animal_id`, `treatment_name`, `date_administered`, `administered_by`) VALUES
(1, NULL, 'Prenatal Checkup', '2025-07-15', 'Dr. Vet');

-- --------------------------------------------------------

--
-- Table structure for table `donations`
--

CREATE TABLE `donations` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `type` enum('Cash','In-Kind') NOT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `item_name` varchar(255) DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `ref_no` varchar(100) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp(),
  `receipt_img` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `created_at`) VALUES
(10, 'irene', 'irespeleta@my.cspc.edu.ph', '$2b$10$ATRPDFh1y3KW59V03Tr9keqU9ljJJvvbtYfSh.YdzlORsW9LENq8u', '2026-04-07 15:42:13'),
(11, 'admin', 'admin@gmail.com', '$2b$10$BoFOt/93Zt4NVWT/QhmVzem67fNy/dc6.EpQoG6lsjI5wVMu/CfX.', '2026-04-10 14:41:33');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `animals`
--
ALTER TABLE `animals`
  ADD PRIMARY KEY (`animal_id`);

--
-- Indexes for table `animal_medical_history`
--
ALTER TABLE `animal_medical_history`
  ADD PRIMARY KEY (`med_id`),
  ADD KEY `animal_id` (`animal_id`);

--
-- Indexes for table `donations`
--
ALTER TABLE `donations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `animals`
--
ALTER TABLE `animals`
  MODIFY `animal_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `animal_medical_history`
--
ALTER TABLE `animal_medical_history`
  MODIFY `med_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `donations`
--
ALTER TABLE `donations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `animal_medical_history`
--
ALTER TABLE `animal_medical_history`
  ADD CONSTRAINT `animal_medical_history_ibfk_1` FOREIGN KEY (`animal_id`) REFERENCES `animals` (`animal_id`) ON DELETE CASCADE;

--
-- Constraints for table `donations`
--
ALTER TABLE `donations`
  ADD CONSTRAINT `donations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
