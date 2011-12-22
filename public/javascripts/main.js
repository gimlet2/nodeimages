function selectAlbum(index, id) {
	document.getElementById('albumId').value = id;
	clearCellsColor();
	cells = document.getElementById('admin_albums_table').getElementsByTagName('tr')[index].getElementsByTagName('td');
	for (i = 0; i < cells.length; i++) {
        cells[i].style.backgroundColor = 'red';
    }
}

function clearCellsColor() {
	rows = document.getElementById('admin_albums_table').getElementsByTagName('tr');
	for (j = 0; j < rows.length; j++) {
		cells = rows[j].getElementsByTagName('td');
		for (i = 0; i < cells.length; i++) {
	        cells[i].style.backgroundColor = '#eee';
    	}
	}
}