-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 31, 2020 at 11:17 AM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `perpus`
--

-- --------------------------------------------------------

--
-- Table structure for table `anggota`
--

CREATE TABLE `anggota` (
  `id_anggota` int(11) NOT NULL,
  `nama_anggota` varchar(255) NOT NULL,
  `gender` varchar(20) NOT NULL,
  `alamat` varchar(255) NOT NULL,
  `telefon` int(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `anggota`
--

INSERT INTO `anggota` (`id_anggota`, `nama_anggota`, `gender`, `alamat`, `telefon`, `email`, `password`) VALUES
(1, 'bayu', 'L', 'Malang', 21, 'bayu@gmail.com', '$2b$10$vD6UNhdpDlFg.Mz2kcfAYOiKa3Rz8uQlzkBuFA6WkDnT9Vv.6MPVi'),
(2, 'feriawan', 'L', 'Campurdarat', 211, 'feri@gmail.com', '$2b$10$yF7Jbc85mC9dR5ylptH.QuLYKLdaQXFiej1DpaxDbyN6P5SYSLGiO');

-- --------------------------------------------------------

--
-- Table structure for table `buku`
--

CREATE TABLE `buku` (
  `id_buku` int(11) NOT NULL,
  `kode_buku` varchar(100) NOT NULL,
  `judul` varchar(500) NOT NULL,
  `pengarang` varchar(500) NOT NULL,
  `penerbit` varchar(255) NOT NULL,
  `stok` int(11) NOT NULL,
  `petugas` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `buku`
--

INSERT INTO `buku` (`id_buku`, `kode_buku`, `judul`, `pengarang`, `penerbit`, `stok`, `petugas`, `email`) VALUES
(1, 'p1', 'perahu kertas', 'aaaa', 'bbbb', 200, 'Septin Dwi', 'septinn@gmail'),
(3, 'b1', 'BUMI', 'Fiersa Besari', 'bbbb', 200, 'Septin Dwi', 'septinn@gmail'),
(4, 'e1', 'embun', 'bbb', 'aaa', 200, 'alvin m', 'alvin@gmail');

-- --------------------------------------------------------

--
-- Table structure for table `peminjam`
--

CREATE TABLE `peminjam` (
  `no_pinjam` int(100) NOT NULL,
  `anggota` varchar(100) NOT NULL,
  `petugas` varchar(100) NOT NULL,
  `jumlah` int(11) NOT NULL,
  `tgl_pinjam` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `petugas`
--

CREATE TABLE `petugas` (
  `id_petugas` int(100) NOT NULL,
  `nama_petugas` varchar(255) NOT NULL,
  `jabatan` varchar(255) NOT NULL,
  `telefon` int(12) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `petugas`
--

INSERT INTO `petugas` (`id_petugas`, `nama_petugas`, `jabatan`, `telefon`, `email`, `password`) VALUES
(2, 'Septin Dwi', 'Karyawan', 82222222, 'septinn@gmail', '$2b$10$qdkOpf4UvzwHmK8ZpzKKq.5jqU0k0NPBxtvj5snps8k6bfo4iUORi'),
(3, 'alya', 'anggota', 822, 'alya@gmail', '$2b$10$fx4IAGIHyXOT/p2x5Rb1xOCdPGeYKdLqShCDbb1tjw1A6OCRc9Es6'),
(4, 'alvin m', 'anggotaa', 8211, 'alvin@gmail', '$2b$10$EEdz6apjKVVN7/Q4VlUsPOIlt/16Z.vf8cQI03jjfQEb7UiXePfIO');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `anggota`
--
ALTER TABLE `anggota`
  ADD PRIMARY KEY (`id_anggota`);

--
-- Indexes for table `buku`
--
ALTER TABLE `buku`
  ADD PRIMARY KEY (`id_buku`);

--
-- Indexes for table `peminjam`
--
ALTER TABLE `peminjam`
  ADD PRIMARY KEY (`no_pinjam`);

--
-- Indexes for table `petugas`
--
ALTER TABLE `petugas`
  ADD PRIMARY KEY (`id_petugas`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `anggota`
--
ALTER TABLE `anggota`
  MODIFY `id_anggota` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `buku`
--
ALTER TABLE `buku`
  MODIFY `id_buku` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `petugas`
--
ALTER TABLE `petugas`
  MODIFY `id_petugas` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
