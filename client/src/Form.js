import React from 'react';
import Popup from 'reactjs-popup';
import { useState } from 'react';
import 'reactjs-popup/dist/index.css';
import ReactDOM from 'react-dom/client';

function Form() {
    // files and selected file
    const [files, setFiles] = useState(["constraints.xdc"]);
    const [selectedFile, setSelectedFile] = useState("");
    const [popupDisplayed, setPopupDisplayed] = useState(false);
	const [newFilename, setNewFilename] = useState('');
 
	function CreateFileModal() {
		return <>
				<div style={{display: 'flex',
					'flex-direction': 'column',

					display: selectedFile === 'new' ? 'default' : 'none'}}>
					<div style={{
						display: 'flex',
						'flex-direction': 'row',
						'justify-content': 'end'}}>
						<div style={{display: 'flex'}}>
							X
						</div>
					</div>
					<div style={{display: 'flex'}}>
						Filename: <input onChange={updateFilename} value={newFilename}/><button type="submit" onClick={createFile}>create file</button>
					</div>
				</div>
			</>
	}

	const createFile = () => {
		if (!newFilename.endsWith(".vhd")) {
			if (newFilename.indexOf(".") != -1) {
				newFilename = newFilename.substring(0, newFilename.indexOf("."));
			}
			newFilename += ".vhd";
		}
		console.log("adding filename " + newFilename);
		setFiles([...files, newFilename]);
		setPopupDisplayed(false);
	}

    const handleSelectFile = (event) => {
		console.log(event.target.value + ' selected!');
		setSelectedFile(event.target.value);
    }

    const updateFilename = (event) => {
		newFilename = event.target.value;
    }
    
    return (
		<>
			<CreateFileModal></CreateFileModal>
			<form>
				<label for='fileSelectInput' style={{'padding-right': '1rem'}}>
				FILE:
				</label>
				<SelectAndAdd files={files} selectedFile={selectedFile} handleSelectFile={handleSelectFile}></SelectAndAdd>
				<br />
				TYPE:
				<select>
				<option value="functional">functional</option>
				<option value="structural">structural</option>
				<option value="procedural">procedural</option>
				</select>
				<IOMapping></IOMapping>
			</form>
		</>
    )
}

function SelectAndAdd({files, selectedFile, handleSelectFile}) {
    return (
	    <select id='fileSelectInput' value={selectedFile} onChange={handleSelectFile}>
	    { files.map(filename => <option key={filename} value={filename}>{filename}</option>) }
	    <option value="new">NEW</option>
	    </select>
    )
}

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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Form />);

export default Form;
