<?php

class Database {
	private $host = 'localhost';
	private $db = 'gacha_sim';
	private $user = 'root';
	private $password = '';
	private $conn;


	function connect() {
		$dsn = "mysql:host=$this->host;dbname=$this->db;charset=UTF8";
	
		try {
			$this->conn = new PDO($dsn, $this->user, $this->password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
		} catch (PDOException $e) {
			echo $e->getMessage();
		}

		return $this->conn;
	}
}