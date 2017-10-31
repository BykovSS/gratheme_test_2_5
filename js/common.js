'use strict';

window.addEventListener('load', function () {

	var br_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	var br_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
	br_height = br_height - document.getElementsByTagName('h3')[0].offsetHeight;
	var koef_w = 1,
	    koef_h = 1;
	document.getElementsByTagName('svg')[0].setAttribute('viewBox', '0, 0, ' + (br_width - 17) + ', ' + (br_height - 17));
	var side = br_width * 0.1;
	var figures = [{ id: "square", x: br_width / 2 - side, y: br_height / 2 - side, side: side, color: "blue" }, { id: "round", cx: br_width / 2 + side / 2, cy: br_height / 2 - side / 2, r: side / 2, color: "red" }, { id: "rhombus", x: br_width / 2 - side / (2 * Math.sqrt(2)) - side / 2, y: br_height / 2 - Math.sqrt(2) * side / 4 + side / 2, side: side / Math.sqrt(2), color: "yellowgreen" }];

	function RenderFigures(figures) {
		var square = void 0,
		    round = void 0,
		    rhombus = void 0;
		if (document.getElementById('figures')) {
			document.getElementById('figures').parentElement.removeChild(document.getElementById('figures'));
			square = '<rect id="' + figures[0].id + '" x=' + figures[0].x + ' y=' + figures[0].y + ' width=' + figures[0].side * koef_w + ' height=' + figures[0].side * koef_w + ' fill=' + figures[0].color + ' />';
			round = '<circle id="' + figures[1].id + '" cx=' + figures[1].cx + ' cy=' + figures[1].cy + ' r=' + figures[1].r * koef_w + ' fill=' + figures[1].color + ' />';
			rhombus = '<rect id="' + figures[2].id + '" transform="rotate(45, ' + (figures[2].x + figures[2].side / 2 * koef_w) + ', ' + (figures[2].y + Math.sqrt(2) * side / 4 * koef_w) + ')" x=' + figures[2].x + ' y=' + figures[2].y + ' width=' + figures[2].side * koef_w + ' height=' + figures[2].side * koef_w + ' fill=' + figures[2].color + ' />';
		} else {
			square = '<rect id="' + figures[0].id + '" x=' + figures[0].x + ' y=' + figures[0].y + ' width=' + figures[0].side + ' height=' + figures[0].side + ' fill=' + figures[0].color + ' />';
			round = '<circle id="' + figures[1].id + '" cx=' + figures[1].cx + ' cy=' + figures[1].cy + ' r=' + figures[1].r + ' fill=' + figures[1].color + ' />';
			rhombus = '<rect id="' + figures[2].id + '" transform="rotate(45, ' + (figures[2].x + figures[2].side / 2) + ', ' + (figures[2].y + Math.sqrt(2) * side / 4) + ')" x=' + figures[2].x + ' y=' + figures[2].y + ' width=' + figures[2].side + ' height=' + figures[2].side + ' fill=' + figures[2].color + ' />';
		}
		document.getElementsByTagName('svg')[0].innerHTML += '<g id="figures">' + square + ' ' + round + ' ' + rhombus + '</g>';
	}

	RenderFigures(figures);

	window.addEventListener('devicemotion', handler);

	function handler(event) {
		var x = void 0,
		    y = void 0;
		if (br_width * koef_w > br_height * koef_h) {
			x = event.accelerationIncludingGravity.x;
			y = event.accelerationIncludingGravity.y;
		} else {
			y = -event.accelerationIncludingGravity.x;
			x = event.accelerationIncludingGravity.y;
		}

		var width = br_width * koef_w;
		var height = br_height * koef_h;

		var dist_s = [figures[0].x + y, figures[0].y + x];
		var dist_r = [figures[1].cx + y, figures[1].cy + x];
		var dist_rh = [figures[2].x + y, figures[2].y + x];

		if (y < 0) {
			//square move left
			if (dist_s[0] <= 0) dist_s[0] = 0;else if (dist_s[0] <= figures[1].cx + figures[1].r * koef_w && dist_s[0] > figures[1].cx && dist_s[1] > figures[1].cy - (figures[1].r * koef_w + koef_w * side) + x && dist_s[1] < x + figures[1].cy + figures[1].r * koef_w) dist_s[0] = figures[1].cx + figures[1].r * koef_w;else if (dist_s[0] <= figures[2].x + figures[2].side / 2 * koef_w + koef_w * side / 2 && dist_s[0] > figures[2].x && dist_s[1] > figures[2].y - koef_w * side * 1.5 + figures[2].side / 2 * koef_w + x && dist_s[1] < x + figures[2].y + figures[2].side / 2 * koef_w + koef_w * side / 2) dist_s[0] = figures[2].x + figures[2].side / 2 * koef_w + koef_w * side / 2;

			//round move left
			if (dist_r[0] <= figures[1].r * koef_w) dist_r[0] = figures[1].r * koef_w;else if (dist_r[0] <= figures[0].x + figures[0].side * koef_w + figures[1].r * koef_w && dist_r[0] > figures[0].x && dist_r[1] > figures[0].y - figures[1].r * koef_w + x && dist_r[1] < x + figures[0].y + figures[0].side * koef_w + figures[1].r * koef_w) dist_r[0] = figures[0].x + figures[0].side * koef_w + figures[1].r * koef_w;else if (dist_r[0] <= figures[2].x + figures[2].side / 2 * koef_w + koef_w * side / 2 + figures[1].r * koef_w && dist_r[0] > figures[2].x && dist_r[1] > figures[2].y - koef_w * side / 2 + figures[2].side / 2 * koef_w - figures[1].r * koef_w + x && dist_r[1] < x + figures[2].y + koef_w * side / 2 + figures[2].side / 2 * koef_w + figures[1].r * koef_w) dist_r[0] = figures[2].x + figures[2].side / 2 * koef_w + koef_w * side / 2 + figures[1].r * koef_w;

			// //rhombus move left
			if (dist_rh[0] <= side / 2 * koef_w - figures[2].side / 2 * koef_w) dist_rh[0] = side / 2 * koef_w - figures[2].side / 2 * koef_w;else if (dist_rh[0] <= figures[0].x + koef_w * side * 1.5 - figures[2].side / 2 * koef_w && dist_rh[0] > figures[0].x && dist_rh[1] > figures[0].y - koef_w * side / 2 - figures[2].side / 2 * koef_w + x && dist_rh[1] < x + figures[0].y + koef_w * side * 1.5 - figures[2].side / 2 * koef_w) dist_rh[0] = figures[0].x + koef_w * side * 1.5 - figures[2].side / 2 * koef_w;else if (dist_rh[0] <= figures[1].cx + figures[1].r * koef_w + koef_w * side / 2 - figures[2].side / 2 * koef_w && dist_rh[0] > figures[1].cx && dist_rh[1] > figures[1].cy - figures[1].r * koef_w - koef_w * side / 2 - figures[2].side / 2 * koef_w + x && dist_rh[1] < x + figures[1].cy + figures[1].r * koef_w + koef_w * side / 2 - figures[2].side / 2 * koef_w) dist_rh[0] = figures[1].cx + figures[1].r * koef_w + koef_w * side / 2 - figures[2].side / 2 * koef_w;
		} else if (y > 0) {
			//square move right
			if (dist_s[0] >= width - 17 - figures[0].side * koef_w) dist_s[0] = width - 17 - figures[0].side * koef_w;else if (dist_s[0] >= figures[1].cx - figures[1].r * koef_w - figures[0].side * koef_w && dist_s[0] < figures[1].cx && dist_s[1] > figures[1].cy - (figures[1].r * koef_w + koef_w * side) + x && dist_s[1] < x + figures[1].cy + figures[1].r * koef_w) dist_s[0] = figures[1].cx - figures[1].r * koef_w - figures[0].side * koef_w;else if (dist_s[0] >= figures[2].x + figures[2].side / 2 * koef_w - koef_w * side * 1.5 && dist_s[0] < figures[2].x && dist_s[1] > figures[2].y - koef_w * side * 1.5 + figures[2].side / 2 * koef_w + x && dist_s[1] < x + figures[2].y + figures[2].side / 2 * koef_w + koef_w * side / 2) dist_s[0] = figures[2].x + figures[2].side / 2 * koef_w - koef_w * side * 1.5;

			//round move right
			if (dist_r[0] >= width - 17 - figures[1].r * koef_w) dist_r[0] = width - 17 - figures[1].r * koef_w;else if (dist_r[0] >= figures[0].x - figures[1].r * koef_w && dist_r[0] < figures[0].x && dist_r[1] > figures[0].y - figures[1].r * koef_w + x && dist_r[1] < x + figures[0].y + figures[0].side * koef_w + figures[1].r * koef_w) dist_r[0] = figures[0].x - figures[1].r * koef_w;else if (dist_r[0] >= figures[2].x + figures[2].side / 2 * koef_w - koef_w * side / 2 - figures[1].r * koef_w && dist_r[0] < figures[2].x && dist_r[1] > figures[2].y - koef_w * side / 2 + figures[2].side / 2 * koef_w - figures[1].r * koef_w + x && dist_r[1] < x + figures[2].y + koef_w * side / 2 + figures[2].side / 2 * koef_w + figures[1].r * koef_w) dist_r[0] = figures[2].x + figures[2].side / 2 * koef_w - koef_w * side / 2 - figures[1].r * koef_w;

			//rhombus move right
			if (dist_rh[0] >= width - 17 - figures[2].side / 2 * koef_w - koef_w * side / 2) dist_rh[0] = width - 17 - figures[2].side / 2 * koef_w - koef_w * side / 2;else if (dist_rh[0] >= figures[0].x - koef_w * side / 2 - figures[2].side / 2 * koef_w && dist_rh[0] < figures[0].x && dist_rh[1] > figures[0].y - koef_w * side / 2 - figures[2].side / 2 * koef_w + x && dist_rh[1] < x + figures[0].y + koef_w * side * 1.5 - figures[2].side / 2 * koef_w) dist_rh[0] = figures[0].x - koef_w * side / 2 - figures[2].side / 2 * koef_w;else if (dist_rh[0] >= figures[1].cx - figures[1].r * koef_w - koef_w * side / 2 - figures[2].side / 2 * koef_w && dist_rh[0] < figures[1].cx && dist_rh[1] > figures[1].cy - figures[1].r * koef_w - koef_w * side / 2 - figures[2].side / 2 * koef_w + x && dist_rh[1] < x + figures[1].cy + figures[1].r * koef_w + koef_w * side / 2 - figures[2].side / 2 * koef_w) dist_rh[0] = figures[1].cx - figures[1].r * koef_w - koef_w * side / 2 - figures[2].side / 2 * koef_w;
		}

		if (x < 0) {
			//square move top
			if (dist_s[1] <= 0) dist_s[1] = 0;else if (dist_s[1] <= figures[1].cy + figures[1].r * koef_w && dist_s[1] > figures[1].cy && dist_s[0] > figures[1].cx - (figures[1].r * koef_w + koef_w * side) && dist_s[0] < figures[1].cx + figures[1].r * koef_w) dist_s[1] = figures[1].cy + figures[1].r * koef_w;else if (dist_s[1] <= figures[2].y + figures[2].side / 2 * koef_w + koef_w * side / 2 && dist_s[1] > figures[2].y && dist_s[0] > figures[2].x - koef_w * side * 1.5 + figures[2].side / 2 * koef_w && dist_s[0] < figures[2].x + figures[2].side / 2 * koef_w + koef_w * side / 2) dist_s[1] = figures[2].y + figures[2].side / 2 * koef_w + koef_w * side / 2;

			//round move top
			if (dist_r[1] <= figures[1].r * koef_w) dist_r[1] = figures[1].r * koef_w;else if (dist_r[1] <= figures[0].y + figures[0].side * koef_w + figures[1].r * koef_w && dist_r[1] > figures[0].y && dist_r[0] > figures[0].x - figures[1].r * koef_w && dist_r[0] < figures[0].x + figures[0].side * koef_w + figures[1].r * koef_w) dist_r[1] = figures[0].y + figures[0].side * koef_w + figures[1].r * koef_w;else if (dist_r[1] <= figures[2].y + figures[2].side / 2 * koef_w + koef_w * side / 2 + figures[1].r * koef_w && dist_r[1] > figures[2].y && dist_r[0] > figures[2].x - koef_w * side / 2 + figures[2].side / 2 * koef_w - figures[1].r * koef_w && dist_r[0] < figures[2].x + koef_w * side / 2 + figures[2].side / 2 * koef_w + figures[1].r * koef_w) dist_r[1] = figures[2].y + figures[2].side / 2 * koef_w + koef_w * side / 2 + figures[1].r * koef_w;

			//rhombus move top
			if (dist_rh[1] <= side / 2 * koef_w - figures[2].side / 2 * koef_w) dist_rh[1] = side / 2 * koef_w - figures[2].side / 2 * koef_w;else if (dist_rh[1] <= figures[0].y + koef_w * side * 1.5 - figures[2].side / 2 * koef_w && dist_rh[1] > figures[0].y && dist_rh[0] > figures[0].x - koef_w * side / 2 - figures[2].side / 2 * koef_w && dist_rh[0] < figures[0].x + koef_w * side * 1.5 - figures[2].side / 2 * koef_w) dist_rh[1] = figures[0].y + koef_w * side * 1.5 - figures[2].side / 2 * koef_w;else if (dist_rh[1] <= figures[1].cy + figures[1].r * koef_w + koef_w * side / 2 - figures[2].side / 2 * koef_w && dist_rh[1] > figures[1].cy && dist_rh[0] > figures[1].cx - figures[1].r * koef_w - koef_w * side / 2 - figures[2].side / 2 * koef_w && dist_rh[0] < figures[1].cx + figures[1].r * koef_w + koef_w * side / 2 - figures[2].side / 2 * koef_w) dist_rh[1] = figures[1].cy + figures[1].r * koef_w + koef_w * side / 2 - figures[2].side / 2 * koef_w;
		} else if (x > 0) {
			//square move bottom
			if (dist_s[1] >= height - 17 - figures[0].side * koef_w) dist_s[1] = height - 17 - figures[0].side * koef_w;else if (dist_s[1] >= figures[1].cy - figures[1].r * koef_w - figures[0].side * koef_w && dist_s[1] < figures[1].cy && dist_s[0] > figures[1].cx - (figures[1].r * koef_w + koef_w * side) && dist_s[0] < figures[1].cx + figures[1].r * koef_w) dist_s[1] = figures[1].cy - figures[1].r * koef_w - figures[0].side * koef_w;else if (dist_s[1] >= figures[2].y + figures[2].side / 2 * koef_w - koef_w * side * 1.5 && dist_s[1] < figures[2].y && dist_s[0] > figures[2].x - koef_w * side * 1.5 + figures[2].side / 2 * koef_w && dist_s[0] < figures[2].x + figures[2].side / 2 * koef_w + koef_w * side / 2) dist_s[1] = figures[2].y + figures[2].side / 2 * koef_w - koef_w * side * 1.5;

			//round move bottom
			if (dist_r[1] >= height - 17 - figures[1].r * koef_w) dist_r[1] = height - 17 - figures[1].r * koef_w;else if (dist_r[1] >= figures[0].y - figures[1].r * koef_w && dist_r[1] < figures[0].y && dist_r[0] > figures[0].x - figures[1].r * koef_w && dist_r[0] < figures[0].x + figures[0].side * koef_w + figures[1].r * koef_w) dist_r[1] = figures[0].y - figures[1].r * koef_w;else if (dist_r[1] >= figures[2].y + figures[2].side / 2 * koef_w - koef_w * side / 2 - figures[1].r * koef_w && dist_r[1] < figures[2].y && dist_r[0] > figures[2].x - koef_w * side / 2 + figures[2].side / 2 * koef_w - figures[1].r * koef_w && dist_r[0] < figures[2].x + koef_w * side / 2 + figures[2].side / 2 * koef_w + figures[1].r * koef_w) dist_r[1] = figures[2].y + figures[2].side / 2 * koef_w - koef_w * side / 2 - figures[1].r * koef_w;

			//rhombus move right
			if (dist_rh[1] >= height - 17 - figures[2].side / 2 * koef_w - koef_w * side / 2) dist_rh[1] = height - 17 - figures[2].side / 2 * koef_w - koef_w * side / 2;else if (dist_rh[1] >= figures[0].y - koef_w * side / 2 - figures[2].side / 2 * koef_w && dist_rh[1] < figures[0].y && dist_rh[0] > figures[0].x - koef_w * side / 2 - figures[2].side / 2 * koef_w && dist_rh[0] < figures[0].x + koef_w * side * 1.5 - figures[2].side / 2 * koef_w) dist_rh[1] = figures[0].y - koef_w * side / 2 - figures[2].side / 2 * koef_w;else if (dist_rh[1] >= figures[1].cy - figures[1].r * koef_w - koef_w * side / 2 - figures[2].side / 2 * koef_w && dist_rh[1] < figures[1].cy && dist_rh[0] > figures[1].cx - figures[1].r * koef_w - koef_w * side / 2 - figures[2].side / 2 * koef_w && dist_rh[0] < figures[1].cx + figures[1].r * koef_w + koef_w * side / 2 - figures[2].side / 2 * koef_w) dist_rh[1] = figures[1].cy - figures[1].r * koef_w - koef_w * side / 2 - figures[2].side / 2 * koef_w;
		}

		figures[0].x = dist_s[0];
		figures[0].y = dist_s[1];
		figures[1].cx = dist_r[0];
		figures[1].cy = dist_r[1];
		figures[2].x = dist_rh[0];
		figures[2].y = dist_rh[1];
		RenderFigures(figures);
	}

	window.addEventListener('resize', function () {
		var br_width_n = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
		var br_height_n = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		br_height_n = br_height_n - document.getElementsByTagName('h3')[0].offsetHeight;
		koef_w = br_width_n / br_width;
		koef_h = br_height_n / br_height;
		document.getElementsByTagName('svg')[0].setAttribute('viewBox', '0, 0, ' + (br_width_n - 17) + ', ' + (br_height_n - 17));
		RenderFigures(figures);
	});
});