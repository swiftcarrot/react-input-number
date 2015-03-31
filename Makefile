all:
	jsx --no-cache-dir lib dist
	lessc lib/input-number.less > dist/input-number.css
clean:
	rm dist/*
