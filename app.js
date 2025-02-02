function changeTypeContract(e) {
	const nonPayingOnly = document.getElementsByClassName("non-paying-only");
	const payingOnly = document.getElementsByClassName("paying-only");
	if (e.target.value === "betalend") {
		var toShow = payingOnly;
		var toHide = nonPayingOnly;
	} else if (e.target.value === "niet-betalend") {
		var toShow = nonPayingOnly;
		var toHide = payingOnly;
	}
	
	const fieldsets = document.getElementsByTagName("main")[0].getElementsByTagName("fieldset")
	
	for (const el of fieldsets) {
		el.style.display = '';
	}
	
	const infoNotices = document.getElementsByTagName("main")[0].getElementsByClassName("info-notice")
	
	for (const el of infoNotices) {
		el.style.display = '';
	}
	
	document.getElementById("submit").style.display = '';
	
	for (const el of infoNotices) {
		el.style.display = '';
	}
	
	for (const el of toShow) {
		el.style.display = '';
	}
	for (const el of toHide) {
		el.style.display = 'none';
	}
} 

const typeContractOptionElements = document.getElementsByName("type-contract")

for (const el of typeContractOptionElements) {
	el.addEventListener("input", changeTypeContract);
}

const uitpasNummer = "";

function changeAangetekendeBrief(e) {
	if (e.target.checked === true) {
		document.getElementById("uitpas-nummer").disabled = true;
	} else if (e.target.checked === false) {
		document.getElementById("uitpas-nummer").disabled = false;
	}
}

document.getElementById("aangetekende-brief").addEventListener("input", changeAangetekendeBrief);

// Schaamteloos gestolen van trincot op StackExchange. CC BY-SA is toepasselijk. 
// https://stackoverflow.com/questions/12578507/implement-an-input-with-a-mask
// This code empowers all input tags having a placeholder and data-slots attribute
document.addEventListener('DOMContentLoaded', () => {
    for (const el of document.querySelectorAll("[placeholder][data-slots]")) {
        const pattern = el.getAttribute("placeholder"),
            slots = new Set(el.dataset.slots || "_"),
            prev = (j => Array.from(pattern, (c,i) => slots.has(c)? j=i+1: j))(0),
            first = [...pattern].findIndex(c => slots.has(c)),
            accept = new RegExp(el.dataset.accept || "\\d", "g"),
            clean = input => {
                input = input.match(accept) || [];
                return Array.from(pattern, c =>
                    input[0] === c || slots.has(c) ? input.shift() || c : c
                );
            },
            format = () => {
                const [i, j] = [el.selectionStart, el.selectionEnd].map(i => {
                    i = clean(el.value.slice(0, i)).findIndex(c => slots.has(c));
                    return i<0? prev.at(-1) : back ? prev[i-1] || first : i;
                });
                el.value = clean(el.value).join("");
                el.setSelectionRange(i, j);
                back = false;
            };
        let back = false;
        el.addEventListener("keydown", (e) => back = e.key === "Backspace");
        el.addEventListener("input", format);
        el.addEventListener("focus", format);
        el.addEventListener("blur", () => el.value === pattern && (el.value=""));
    }
});