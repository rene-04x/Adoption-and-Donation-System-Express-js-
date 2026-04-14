-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 14, 2026 at 03:14 PM
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
-- Table structure for table `adoption_applications`
--

CREATE TABLE `adoption_applications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `pet_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `given_name` varchar(100) DEFAULT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `fb_link` text DEFAULT NULL,
  `contact_method` varchar(50) DEFAULT NULL,
  `employment_status` varchar(50) DEFAULT NULL,
  `pet_experience` varchar(10) DEFAULT NULL,
  `living_type` text DEFAULT NULL,
  `fenced_yard` varchar(10) DEFAULT NULL,
  `pets_allowed` varchar(10) DEFAULT NULL,
  `reason_adoption` text DEFAULT NULL,
  `application_status` varchar(50) DEFAULT 'Pending Review',
  `date_applied` timestamp NOT NULL DEFAULT current_timestamp(),
  `valid_id_path` varchar(255) DEFAULT NULL,
  `proof_address_path` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Active',
  `admin_notes` text DEFAULT NULL,
  `interview_date` date DEFAULT NULL,
  `interview_time` varchar(50) DEFAULT NULL,
  `interview_method` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(1, 'Adobro', '', 'Male', 'Aspin', 22, 'brown and white on extremities & end of tail', 'Kind,Friendly', 'Available', '2024-02-18', 'CSPC', 'idkkkk', '4bf6aa144ae48a780bff19319be59e77', '2026-04-10 16:22:59'),
(2, 'Moew', '', 'Female', 'IKD', 11, 'Blue', 'Soft,Kind', 'Adopted', '2026-02-22', 'Iiga', 'TC', 'd792781ffea69daf86794ac8f338c7d3', '2026-04-12 07:16:23'),
(3, 'Patata', 'Dog', 'Male', 'Shi Tzu', 24, 'White', 'Cute,Kind,Fierce', 'Available', '2026-02-03', 'Sto.Nino, Iriga City', 'He was found in a litter box, so smol and scared and I cannot help but took pity on himm!! please adopt this bb wahhhhhh...di juk binili ni ate mwejejeje!! miss u tata my beybiii <3', '17921da9ced394247ff539f886cc588e', '2026-04-12 13:47:00'),
(4, 'Carla', 'Cat', 'Female', 'Hooman', 240, 'White', 'Crzy,Cute,Pretty,Haw+t', 'Pending', '2005-04-14', 'Bato', 'inire ni mama nya mwajajaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', 'b86a500e918c19507860293bd6fd6877', '2026-04-12 13:56:20'),
(6, '', '', '', '', 0, '', '', 'Available', '0000-00-00', '', '', NULL, '2026-04-12 18:40:31');

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
(25, 3, 'Deworm', '2026-03-06', 'Dr. Mayen'),
(28, 4, 'Anti-Crzyness', '2026-02-26', 'Dr.Irene'),
(30, 1, 'Deworm', '2026-03-06', 'Dr. Irene');

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
  `status` enum('pending','verified','rejected') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `donations`
--

INSERT INTO `donations` (`id`, `user_id`, `donor_name`, `type`, `amount`, `item_name`, `email`, `phone`, `payment_method`, `ref_no`, `date`, `receipt_img`, `status`) VALUES
(11, 10, 'Irene Espeleta', 'Cash', 700.00, 'food', NULL, NULL, 'GCash', '5555555555555', '2026-04-10 17:44:30', 'receipt-1775843070350.png', 'pending'),
(12, 10, 'Irene Espeleta', 'Cash', 57.00, 'needed_most', NULL, NULL, 'GCash', '5555555555555', '2026-04-10 17:45:11', 'receipt-1775843111504.png', 'verified'),
(13, 10, 'Irene Espeleta', '', NULL, 'dog food', 'irespeleta@my.cspc.edu.ph', '09767567555', NULL, NULL, '2026-04-10 17:49:39', NULL, 'verified'),
(14, 10, 'Irene Espeleta', 'Cash', 5.00, 'General', NULL, NULL, 'GCash', '5555555555555', '2026-04-10 17:54:46', 'receipt-1775843685847.png', 'verified'),
(15, 10, 'Irene Espeleta', 'Cash', 56.00, 'medical', NULL, NULL, 'GCash', '5555555555555', '2026-04-10 17:56:07', 'receipt-1776074766405-128835324.png', 'pending'),
(16, 10, 'Irene Espeleta', '', NULL, 'cat food', 'irespeleta@my.cspc.edu.ph', '09434444444', NULL, NULL, '2026-04-10 17:56:56', NULL, 'rejected'),
(27, 10, 'Irene Espeleta', '', NULL, 'dog food', 'irespeleta@my.cspc.edu.ph', '90666666666', NULL, NULL, '2026-04-12 11:33:58', NULL, 'verified'),
(28, 10, 'Irene Espeleta', 'Cash', 500.00, 'General', NULL, NULL, 'GCash', '5555555555555', '2026-04-12 11:39:25', 'receipt-1775993965644.png', 'verified'),
(29, 10, 'Irene Espeleta', '', NULL, 'si miguela', 'irespeleta@my.cspc.edu.ph', '09444444444', NULL, NULL, '2026-04-12 11:41:43', NULL, 'verified'),
(30, 10, 'Miguela Baluca', 'Cash', 30.00, 'medical', NULL, NULL, 'GCash', '4546466464664', '2026-04-12 12:55:32', 'receipt-1775998532749.png', 'verified'),
(31, 10, 'Carla', 'Cash', 30.00, 'medical', NULL, NULL, 'GCash', '1111111111111', '2026-04-12 14:03:28', 'receipt-1776074073939-977223910.png', 'verified'),
(32, 10, 'Shanice Magbanua', 'Cash', 600.00, 'food', NULL, NULL, 'GCash', '1111111111111', '2026-04-13 08:13:26', 'receipt-1776068006188.png', 'pending'),
(33, 10, 'Jhyzzeel Dionela', '', NULL, 'poop', 'Jhyzzeel@gmail.com', '09455555555', NULL, NULL, '2026-04-13 10:20:54', NULL, 'pending'),
(34, 10, 'Jhyzeell', '', NULL, 'fhcf', 'irespeleta@my.cspc.edu.ph', '09678676767', NULL, NULL, '2026-04-13 10:29:17', NULL, 'pending');

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
-- Indexes for table `adoption_applications`
--
ALTER TABLE `adoption_applications`
  ADD PRIMARY KEY (`id`);

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
-- Indexes for table `rejection_logs`
--
ALTER TABLE `rejection_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `donation_id` (`donation_id`);

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
-- AUTO_INCREMENT for table `adoption_applications`
--
ALTER TABLE `adoption_applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `animals`
--
ALTER TABLE `animals`
  MODIFY `animal_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `animal_medical_history`
--
ALTER TABLE `animal_medical_history`
  MODIFY `med_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `donations`
--
ALTER TABLE `donations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `rejection_logs`
--
ALTER TABLE `rejection_logs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

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

--
-- Constraints for table `rejection_logs`
--
ALTER TABLE `rejection_logs`
  ADD CONSTRAINT `rejection_logs_ibfk_1` FOREIGN KEY (`donation_id`) REFERENCES `donations` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
