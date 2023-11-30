import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

const UploadingPhotoTable = ({ files }) => {
    //console.log("changing")
    //console.log(files)
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
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default UploadingPhotoTable;