/**
 * 复制内容到剪切板
 * @param  {[string]} id [待复制的标签的id值]
 * @return {[void]}    [无返回值，a标签返回值写在onclick中]
 */
function copyToClipboard(id) {
	var aInput  = document.createElement("input");
	var content = document.getElementById(id).getAttribute("href") || document.getElementById(id).innerHTML || document.getElementById(id).value;
	if (content.length != 0) {
		alert("复制成功！");
	}
	aInput.setAttribute("value", content);
	document.body.appendChild(aInput);
	aInput.select();
	document.execCommand("copy");
	document.body.removeChild(aInput);
}