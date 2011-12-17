var cluster = require('cluster');
var server = require("./server");

cluster(server)
	.use(cluster.logger('logs'))
	.use(cluster.stats())
	.use(cluster.pidfiles('pids'))
	.use(cluster.cli())
	.use(cluster.repl(8888))
	.listem(3000);
