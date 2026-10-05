/* Configure the publisher ID only after the H5 Games Ads application is approved. */
window.FESTIVAL_ADS_PUBLISHER_ID = "";
window.FESTIVAL_ADS_TEST_MODE = true;
window.festivalAdsReady = false;

window.requestFestivalAd = function (type, name) {
	if (!window.festivalAdsReady || typeof window.adBreak !== "function") return false;
	window.adBreak({
		type: type,
		name: name,
		adBreakDone: function () {
			if (typeof window.godotAdBreakDone === "function") window.godotAdBreakDone();
		}
	});
	return true;
};

(function loadFestivalAds() {
	const publisherId = window.FESTIVAL_ADS_PUBLISHER_ID;
	if (!publisherId) return;

	const script = document.createElement("script");
	script.async = true;
	script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + encodeURIComponent(publisherId);
	script.crossOrigin = "anonymous";
	script.dataset.adClient = publisherId;
	if (window.FESTIVAL_ADS_TEST_MODE) script.dataset.adbreakTest = "on";
	script.onload = function () {
		if (typeof window.adConfig !== "function" || typeof window.adBreak !== "function") return;
		window.adConfig({ preloadAdBreaks: "auto", sound: "on" });
		window.festivalAdsReady = true;
	};
	document.head.appendChild(script);
})();
