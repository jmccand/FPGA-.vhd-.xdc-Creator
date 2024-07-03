import React from 'react';
import { useState } from 'react';
import 'reactjs-popup/dist/index.css';
import ReactDOM from 'react-dom/client';
import './Form.css';
import $ from 'jquery';

function Form() {
	// file list
    const [files, setFiles] = useState(['constraints.xdc']);
	// selected file
    const [selectedFile, setSelectedFile] = useState('');
	// popup displayed
    const [popupDisplayed, setPopupDisplayed] = useState(false); 

	// modal for creating a file
	function CreateFileModal() {
		return <>
				<div className={ `modal ${selectedFile === 'new' ? 'open' : 'closed'}` }>
					<div className='topbar'>
						<div style={{display: 'flex', paddingRight: '0.5rem', cursor: 'pointer'}} onClick={() => setSelectedFile(files[0])}>
							X
						</div>
					</div>
					<div className='content'>
						<span style={{paddingRight: '0.5rem'}}>Filename:</span><input type='text' name='filename' id='newFilenameInput'/><button type="submit" onClick={createFile}>create file</button>
					</div>
				</div>
			</>
	}

	// create file on modal submissiond=
	const createFile = () => {
		var newFilename = document.getElementById('newFilenameInput').value
		if (!newFilename.endsWith(".vhd")) {
			if (newFilename.indexOf(".") !== -1) {
				newFilename = newFilename.substring(0, newFilename.indexOf("."));
			}
			newFilename += ".vhd";
		}
		setFiles([...files, newFilename]);
		setPopupDisplayed(false);
	}

	// form content
    return (
		<>
			<CreateFileModal></CreateFileModal>
			<form style={{position: 'absolute',
				left: '50%',
				transform: 'translateX(-50%)',
				top: '10%',
				border: '2px solid black',
				borderRadius: '1rem',
				padding: '1rem',
				display: 'flex',
				flexDirection: 'column',
				gap: '1rem'}}>
					<div style={{display: 'flex'}}>
						<label htmlFor='fileSelectInput'>
							FILE:
						</label>
						<SelectAndAdd></SelectAndAdd>
					</div>
					<div style={{display: selectedFile.endsWith('.vhd') ? 'flex' : 'none'}}>
						<label htmlFor='fileTypeInput'>
							TYPE:
						</label>
						<select id='fileTypeInput'>
							<option value="functional">functional</option>
							<option value="structural">structural</option>
							<option value="procedural">procedural</option>
						</select>
					</div>
				<IOMapping></IOMapping>
			</form>
		</>
    )

	// the select object with all the files as options
	function SelectAndAdd() {
		return (
			<select id='fileSelectInput' value={selectedFile} onChange={(event) => setSelectedFile(event.target.value)}>
			{ files.map(filename => <option key={filename} value={filename}>{filename}</option>) }
			<option value="new">NEW</option>
			</select>
		)
	}

	// the IOMapping
	function IOMapping({}) {
		return (
			<table>
			<tbody>
			<tr>
			<td>NAME</td>
			<td>TYPE</td>
			</tr>
			</tbody>
			</table>
		)
	}
}

export default Form;
