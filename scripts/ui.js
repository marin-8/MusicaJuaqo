
class UI
{
    static R = document.getElementById("ui_r");
    static X0 = document.getElementById("ui_x0");

    static WaveType = document.getElementById("ui_waveType");

    static SaveLocalStorage = document.getElementById("ui_saveLocalStorage");
    static DeleteLocalStorage = document.getElementById("ui_deleteLocalStorage");
    static LocalStorageSaves = document.getElementById("ui_localStorageSaves");

    static LoadExternalStorage_button = document.getElementById("ui_loadExternalStorage_button");
    static LoadExternalStorage_input = document.getElementById("ui_loadExternalStorage_input");
	
    static PlayStop = document.getElementById("ui_playStop");

	static OutputConfig = [
		{
			Octave: document.getElementById("ui_octave_0"),
			Note: document.getElementById("ui_note_0"),
			FrequencyView: document.getElementById("ui_frequency_0"),
			Ms: document.getElementById("ui_ms_0")
		},
		{
			Octave: document.getElementById("ui_octave_1"),
			Note: document.getElementById("ui_note_1"),
			FrequencyView: document.getElementById("ui_frequency_1"),
			Ms: document.getElementById("ui_ms_1")
		},
		{
			Octave: document.getElementById("ui_octave_2"),
			Note: document.getElementById("ui_note_2"),
			FrequencyView: document.getElementById("ui_frequency_2"),
			Ms: document.getElementById("ui_ms_2")
		},
		{
			Octave: document.getElementById("ui_octave_3"),
			Note: document.getElementById("ui_note_3"),
			FrequencyView: document.getElementById("ui_frequency_3"),
			Ms: document.getElementById("ui_ms_3")
		},
		{
			Octave: document.getElementById("ui_octave_4"),
			Note: document.getElementById("ui_note_4"),
			FrequencyView: document.getElementById("ui_frequency_4"),
			Ms: document.getElementById("ui_ms_4")
		},
		{
			Octave: document.getElementById("ui_octave_5"),
			Note: document.getElementById("ui_note_5"),
			FrequencyView: document.getElementById("ui_frequency_5"),
			Ms: document.getElementById("ui_ms_5")
		},
		{
			Octave: document.getElementById("ui_octave_6"),
			Note: document.getElementById("ui_note_6"),
			FrequencyView: document.getElementById("ui_frequency_6"),
			Ms: document.getElementById("ui_ms_6")
		},
		{
			Octave: document.getElementById("ui_octave_7"),
			Note: document.getElementById("ui_note_7"),
			FrequencyView: document.getElementById("ui_frequency_7"),
			Ms: document.getElementById("ui_ms_7")
		},
		{
			Octave: document.getElementById("ui_octave_8"),
			Note: document.getElementById("ui_note_8"),
			FrequencyView: document.getElementById("ui_frequency_8"),
			Ms: document.getElementById("ui_ms_8")
		},
		{
			Octave: document.getElementById("ui_octave_9"),
			Note: document.getElementById("ui_note_9"),
			FrequencyView: document.getElementById("ui_frequency_9"),
			Ms: document.getElementById("ui_ms_9")
		}
	];

    static Chart = document.getElementById("ui_chart");

	// ================================================================ //

	static SetupOptions ()
	{
		const octaveOptions = this.#GenerateOctaveOptions();
		const noteOptions = this.#GenerateNoteOptions();

		for (let x = 0; x < 10; x++)
		{
			this.#AppendChildren(UI.OutputConfig[x].Octave, octaveOptions);
			this.#AppendChildren(UI.OutputConfig[x].Note, noteOptions);
		}
	}

	static SetupDefaultSelectedOptions ()
	{
		let currentOctave = 3;
		let currentNote = 5;

		for (let x = 0; x < 10; x++)
		{
			UI.OutputConfig[x].Octave.value = currentOctave.toString();
			UI.OutputConfig[x].Note.value = currentNote.toString();

			currentNote++;

			if (currentNote > 11)
			{
				currentNote = 0;
				currentOctave++;
			}
		}
	}

	static SetupFrecuencyViews ()
	{
		for (let x = 0; x < 10; x++)
		{
			this.OnOctaveOrNoteChange(x);
		}
	}

	// ================================================================ //

	static OnOctaveOrNoteChange (xRange)
	{
		const octave = parseInt(UI.OutputConfig[xRange].Octave.value);
		const note = parseInt(UI.OutputConfig[xRange].Note.value);

		const frecuencyRaw = AlgorithmPlayer.FrequencyMap[octave][note];
		const frecuencyRounded = Helpers.Round(frecuencyRaw,4);
		const frecuencyFormated = frecuencyRounded.toFixed(4).replace('.',',');

		UI.OutputConfig[xRange].FrequencyView.innerHTML = frecuencyFormated;
	}

	// ================================================================ //

	static #GenerateOctaveOptions ()
	{
		const octaveOptions = [];

		for (let o = 0; o < 8; o++)
		{
			var newOctaveOption = document.createElement('option');
			newOctaveOption.value = o.toString();
			newOctaveOption.innerHTML = (o+1).toString();
			octaveOptions.push(newOctaveOption);
		}

		return octaveOptions;
	}

	static #GenerateNoteOptions ()
	{
		const noteOptions = [];

		for (let n = 0; n < 12; n++)
		{
			var newOctaveOption = document.createElement('option');
			newOctaveOption.value = n.toString();
			noteOptions.push(newOctaveOption);
		}

		noteOptions[0].innerHTML = "Do";
		noteOptions[1].innerHTML = "Do♯ / Re♭";
		noteOptions[2].innerHTML = "Re";
		noteOptions[3].innerHTML = "Re♯ / Mi♭";
		noteOptions[4].innerHTML = "Mi";
		noteOptions[5].innerHTML = "Fa";
		noteOptions[6].innerHTML = "Fa♯ / Sol♭";
		noteOptions[7].innerHTML = "Sol";
		noteOptions[8].innerHTML = "Sol♯ / La♭";
		noteOptions[9].innerHTML = "La";
		noteOptions[10].innerHTML = "La♯ / Si♭";
		noteOptions[11].innerHTML = "Si";

		return noteOptions;
	}

	static #AppendChildren (parent, children)
	{
		for (let c = 0; c < children.length; c++)
		{
			const clonedOption = children[c].cloneNode(true);
			parent.appendChild(clonedOption);
		}
	}
}
