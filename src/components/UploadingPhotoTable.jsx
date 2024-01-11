import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material'

const UploadingPhotoTable = ({ files, handleRetryUpload }) => {
    //console.log("changing")

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="uploading photo status">
                <TableHead>
                    <TableRow>
                        <TableCell>Filename</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Retry</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {files !== undefined && files.map((file, index) => {
                        if (file === undefined) {
                            return (<TableRow key={`undefined-row-${index}`}></TableRow>)
                        }
                        return (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {file.file.name}
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    {file.status}
                                </TableCell>
                                <TableCell>
                                    {file.status == "error" ? (<Button variant="contained" onClick={ () => handleRetryUpload({file:file, index:index})}>Retry</Button>) : ""}
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default UploadingPhotoTable;