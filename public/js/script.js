const btn = document.getElementById("btnDoor")
btn.addEventListener('click', (e) => fetch('/openDoor'))