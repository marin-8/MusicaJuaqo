
class UI
{
    static R = document.getElementById("ui_r");
    static X0 = document.getElementById("ui_x0");
    static MinHz = document.getElementById("ui_minHz");
    static MaxHz = document.getElementById("ui_maxHz");
    static MinBPM = document.getElementById("ui_minBPM");
    static MaxBPM = document.getElementById("ui_maxBPM");
    static WaveType = document.getElementById("ui_waveType");
    static SaveLocalStorage = document.getElementById("ui_saveLocalStorage");
    static DeleteLocalStorage = document.getElementById("ui_deleteLocalStorage");
    static LocalStorageSaves = document.getElementById("ui_localStorageSaves");
    static LoadExternalStorage_button = document.getElementById("ui_loadExternalStorage_button");
    static LoadExternalStorage_input = document.getElementById("ui_loadExternalStorage_input");
    static PlayStop = document.getElementById("ui_playStop");
    static HzSliders = [
        document.getElementById("ui_hzSlider_0.0"),
        document.getElementById("ui_hzSlider_0.1"),
        document.getElementById("ui_hzSlider_0.2"),
        document.getElementById("ui_hzSlider_0.3"),
        document.getElementById("ui_hzSlider_0.4"),
        document.getElementById("ui_hzSlider_0.5"),
        document.getElementById("ui_hzSlider_0.6"),
        document.getElementById("ui_hzSlider_0.7"),
        document.getElementById("ui_hzSlider_0.8"),
        document.getElementById("ui_hzSlider_0.9"),
        document.getElementById("ui_hzSlider_1.0"),
    ];
    static BPMSliders = [
        document.getElementById("ui_bpmSlider_0.0"),
        document.getElementById("ui_bpmSlider_0.1"),
        document.getElementById("ui_bpmSlider_0.2"),
        document.getElementById("ui_bpmSlider_0.3"),
        document.getElementById("ui_bpmSlider_0.4"),
        document.getElementById("ui_bpmSlider_0.5"),
        document.getElementById("ui_bpmSlider_0.6"),
        document.getElementById("ui_bpmSlider_0.7"),
        document.getElementById("ui_bpmSlider_0.8"),
        document.getElementById("ui_bpmSlider_0.9"),
        document.getElementById("ui_bpmSlider_1.0"),
    ];
    static Chart = document.getElementById("ui_chart");
}
