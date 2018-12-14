const express = require('express')
const mysql = require('mysql')
const path = require('path')
const fs = require('fs')

const app = express()

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'qwerty1234',
	database: 'mytable'
})

function saveData(number) {
	for (var i = 0; i < number; i++) {
		let date = new Date()
		let data = Math.floor((Math.random() * 100) + 1)

		let item = {date: new Date(date.setMinutes(date.getMinutes() + (5 * i))), data: data}
		connection.query('insert into data set ?', item, function (error, results, fields) {
			if (error) throw error;
		}) 
	}	
}

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static('public'))

app.get('/', function (req, res) {
	connection.query('select * from mytable', function (error, results, fields) {
		if (error) throw error
		res.render('index', {
			data: results
		})
	})
})

app.get('/getData', function (req, res) {
	saveData(100)
	res.json({hello: 'world'})
})

app.listen(5000, () => {
	console.log('server on')
	connection.connect()
})
