"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "_rsc_app_api_report_utils_ts";
exports.ids = ["_rsc_app_api_report_utils_ts"];
exports.modules = {

/***/ "(rsc)/./app/api/report/utils.ts":
/*!*********************************!*\
  !*** ./app/api/report/utils.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getReport: () => (/* binding */ getReport),\n/* harmony export */   hasReport: () => (/* binding */ hasReport),\n/* harmony export */   storeReport: () => (/* binding */ storeReport)\n/* harmony export */ });\n// In a real application, this would be stored in a database\n// For now, we'll simulate a report storage\nconst mockReports = new Map();\n// Helper function to store reports (called from analyze endpoint)\nfunction storeReport(hash, reportData) {\n    mockReports.set(hash, reportData);\n}\n// Helper function to get reports\nfunction getReport(hash) {\n    return mockReports.get(hash);\n}\n// Helper function to check if report exists\nfunction hasReport(hash) {\n    return mockReports.has(hash);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3JlcG9ydC91dGlscy50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0REFBNEQ7QUFDNUQsMkNBQTJDO0FBQzNDLE1BQU1BLGNBQWMsSUFBSUM7QUFFeEIsa0VBQWtFO0FBQzNELFNBQVNDLFlBQVlDLElBQVksRUFBRUMsVUFBZTtJQUN2REosWUFBWUssR0FBRyxDQUFDRixNQUFNQztBQUN4QjtBQUVBLGlDQUFpQztBQUMxQixTQUFTRSxVQUFVSCxJQUFZO0lBQ3BDLE9BQU9ILFlBQVlPLEdBQUcsQ0FBQ0o7QUFDekI7QUFFQSw0Q0FBNEM7QUFDckMsU0FBU0ssVUFBVUwsSUFBWTtJQUNwQyxPQUFPSCxZQUFZUyxHQUFHLENBQUNOO0FBQ3pCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ3JlZW5zaGllbGQtbWFsd2FyZS1kZXRlY3Rvci8uL2FwcC9hcGkvcmVwb3J0L3V0aWxzLnRzP2RmM2EiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gSW4gYSByZWFsIGFwcGxpY2F0aW9uLCB0aGlzIHdvdWxkIGJlIHN0b3JlZCBpbiBhIGRhdGFiYXNlXHJcbi8vIEZvciBub3csIHdlJ2xsIHNpbXVsYXRlIGEgcmVwb3J0IHN0b3JhZ2VcclxuY29uc3QgbW9ja1JlcG9ydHMgPSBuZXcgTWFwKClcclxuXHJcbi8vIEhlbHBlciBmdW5jdGlvbiB0byBzdG9yZSByZXBvcnRzIChjYWxsZWQgZnJvbSBhbmFseXplIGVuZHBvaW50KVxyXG5leHBvcnQgZnVuY3Rpb24gc3RvcmVSZXBvcnQoaGFzaDogc3RyaW5nLCByZXBvcnREYXRhOiBhbnkpIHtcclxuICBtb2NrUmVwb3J0cy5zZXQoaGFzaCwgcmVwb3J0RGF0YSlcclxufVxyXG5cclxuLy8gSGVscGVyIGZ1bmN0aW9uIHRvIGdldCByZXBvcnRzXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRSZXBvcnQoaGFzaDogc3RyaW5nKSB7XHJcbiAgcmV0dXJuIG1vY2tSZXBvcnRzLmdldChoYXNoKVxyXG59XHJcblxyXG4vLyBIZWxwZXIgZnVuY3Rpb24gdG8gY2hlY2sgaWYgcmVwb3J0IGV4aXN0c1xyXG5leHBvcnQgZnVuY3Rpb24gaGFzUmVwb3J0KGhhc2g6IHN0cmluZykge1xyXG4gIHJldHVybiBtb2NrUmVwb3J0cy5oYXMoaGFzaClcclxufSAiXSwibmFtZXMiOlsibW9ja1JlcG9ydHMiLCJNYXAiLCJzdG9yZVJlcG9ydCIsImhhc2giLCJyZXBvcnREYXRhIiwic2V0IiwiZ2V0UmVwb3J0IiwiZ2V0IiwiaGFzUmVwb3J0IiwiaGFzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/report/utils.ts\n");

/***/ })

};
;