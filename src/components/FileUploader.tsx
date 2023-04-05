import {Box, Button, CircularProgress} from "@mui/material";
// import {Block} from "../types/Block";
import {getDocumentInformation} from "../api/api";
import {ChangeEvent, Fragment, useState} from "react";
import {Checkbox, Divider, Input, Select, Option} from "@mui/joy";

export default function FileUploader() {
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<any>();
    const [additionalShown, setAdditionalShown] = useState<any>(false);
    const [separator, setSeparator] = useState<any>("Line");
    const [chunkSize, setChunkSize] = useState<any>(500);
    const [chunkOverlap, setChunkOverlap] = useState<any>(100);
    //const [response, setResponse] = useState<Block[]>([]);

    const handleSubmit = async (evt: any) => {
        const formData = new FormData();
        formData.append('file', file);
        setLoading(true);
        const res = await getDocumentInformation(formData);
        setLoading(false);
        /*if (res.status === 'OK') {
            setResponse(res.result);
        }*/
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log('e.target', e.target.files);
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };


    return <Box
        className="uploadBox"
    >
        <div>
            <Button variant="outlined" component="label">
                Upload a file
                <input type="file" hidden onChange={handleFileChange} />
            </Button>
            <span className="extractTxt">
                {file ? `${file.name.slice(0, 20)}...`: 'No file chosen'}
            </span>
            <span className="extractTxtBold">
                {file ? `(${file.type})`: ''}
            </span>
            {file ?
                <div>
                    <Checkbox
                        className="extractTxt"
                        label="Customize indexing process"
                        checked={additionalShown}
                        onChange={(checked) => setAdditionalShown(checked!)}
                    ></Checkbox>
                </div> : ""
            }
            {file && additionalShown && file.type.toLowerCase() == 'application/pdf'? <div><Checkbox className="extractTxt" label="Index as txt instead of pdf"></Checkbox></div> : ""}
            {file && additionalShown? <Select
                className="uploadParam"
                value={separator}
                onChange={(_, value) => setSeparator(value!)}
                startDecorator={
                    <Fragment>
                        <span className="dividerText">Separator</span>
                        <Divider orientation="vertical" className="divider"/>
                    </Fragment>
                }>
                <Option value="Line">Line</Option>
                <Option value="Paragraph">Paragraph</Option>
            </Select> : ""}
            {file && additionalShown? <Input
                className="uploadParam"
                type="number"
                defaultValue="500"
                placeholder=""
                value={chunkSize}
                onChange={(value) => setChunkSize(value!)}
                startDecorator={
                <Fragment>
                    <span className="dividerText">Chunk Size</span>
                    <Divider orientation="vertical" className="divider"/>
                </Fragment>
                }>
            </Input> : ""}
            {file && additionalShown? <Input
                className="uploadParam"
                type="number"
                defaultValue="100"
                placeholder=""
                value={chunkOverlap}
                onChange={(value) => setChunkOverlap(value!)}
                startDecorator={
                    <Fragment>
                        <span className="dividerText">Chunk Overlap</span>
                        <Divider orientation="vertical" className="divider"/>
                    </Fragment>
                }>
            </Input>: ""}
        </div>
        <div>
            <Button
                variant="contained"
                style={{ width: 120 }}
                onClick={handleSubmit}
            >
                {loading ? (
                    <CircularProgress
                        size={20}
                        style={{ marginRight: 12, color: 'white' }}
                    />
                ) : (
                    'Process'
                )}
            </Button>
            <Button color="error" onClick={() => setFile(null)}>
                Clear
            </Button>
        </div>
    </Box>
}