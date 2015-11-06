all:
	babel lib --out-dir dist
	webpack
clean:
	rm dist/*
	rm example/bundle*
