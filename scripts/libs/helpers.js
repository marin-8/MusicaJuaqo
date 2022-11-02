

class Helpers
{
	// https://stackoverflow.com/a/30832210/13460186

	static Download (data, filename, type)
	{
		var file = new Blob([data], {type: type});
		var a = document.createElement("a"),
		url = URL.createObjectURL(file);
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		setTimeout(function() {
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);  
		}, 0); 
	}

	// https://stackoverflow.com/a/66387148/13460186

	static async GetContentsFromFile (file)
	{
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader()
			fileReader.onload = event => resolve(event.target.result)
			fileReader.onerror = error => reject(null)
			fileReader.readAsText(file)
		});
	}

	// https://stackoverflow.com/a/7343013/13460186

	static Round (value, precision)
	{
		var multiplier = Math.pow(10, precision || 0);
		return Math.round(value * multiplier) / multiplier;
	}
}
