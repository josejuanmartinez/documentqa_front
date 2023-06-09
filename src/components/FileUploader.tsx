import {Box, Button, CircularProgress} from "@mui/material";
import {ProcessDocument} from "../api/api";
import {ChangeEvent, Fragment, useState} from "react";
import {Checkbox, Divider, Input, Select, Option} from "@mui/joy";
import {CHUNK_OVERLAP, CHUNK_SIZE, MAIN_SCREEN, OK, SEPARATORS} from "../constants/const";
import Notify from "../utils/notifications";
import {toast} from "react-toastify";
import {features} from "../constants/features";

export default function FileUploader(
    {changeScreen}: {changeScreen: (index: number) => void}
) {
    const defaultSeparator: string = "paragraph";
    const defaultChunkSize: number = CHUNK_SIZE;
    const defaultChunkOverlap: number = CHUNK_OVERLAP;
    const defaultExtractText: boolean = false;
    const defaultShownAdditional: boolean = false;

    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState<any>();

    const [extractText, setExtractText] = useState<any>(defaultExtractText);
    const [additionalShown, setAdditionalShown] = useState<any>(defaultShownAdditional);
    const [separator, setSeparator] = useState<any>(defaultSeparator);
    const [chunkSize, setChunkSize] = useState<any>(defaultChunkSize);
    const [chunkOverlap, setChunkOverlap] = useState<any>(defaultChunkOverlap);
    const [response, setResponse] = useState<any>();

    const handleSubmit = async (evt: any) => {
        if (file == null)
            return;
        if (loading)
            return;

        const formData = new FormData();
        formData.append("file", file);
        const separatorChar: string = SEPARATORS[separator];
        formData.append("filename", file.name);
        formData.append("filetype", file.type);
        formData.append("extract_text", extractText);
        formData.append("separator", separatorChar);
        formData.append("chunk_size", chunkSize);
        formData.append("chunk_overlap", chunkOverlap);
        setLoading(true);
        const res = await ProcessDocument(formData);

        setTimeout(() => setLoading(false), 5000);
        if (res.code == OK) {
            Notify(toast.TYPE.SUCCESS, "File updated successfully.");
            setFile(null);
            changeScreen(MAIN_SCREEN);
        } else {
            Notify(toast.TYPE.ERROR, res.message);
        }
        setResponse(res);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const changeAdditionalShown = (e: ChangeEvent<HTMLInputElement>) => {
        setAdditionalShown(e.target.checked)
        if (!e.target.checked) {
            setSeparator(defaultSeparator);
            setChunkSize(defaultChunkSize);
            setChunkOverlap(defaultChunkOverlap);
        }
    };

    const changeSeparator = (value: ChangeEvent<HTMLInputElement>) => {
        if (value == null) {
            setSeparator(defaultSeparator);
        } else {
            setSeparator(value);
        }
    };

    const changeChunkSize = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target != null && event.target.value != null) {
            setChunkSize(event.target.value);
        }
    };

    const changeChunkOverlap = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target != null && event.target.value != null) {
            setChunkOverlap(event.target.value);
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
            <span hidden={!features["customizeSplitting"]}>
                {file ?
                    <div>
                        <Checkbox
                            className="extractTxt"
                            label="Customize indexing process"
                            checked={additionalShown}
                            onChange={(checked) => changeAdditionalShown(checked!)}
                        ></Checkbox>
                    </div> : ""
                }
                {file && additionalShown && file.type.toLowerCase() == 'application/pdf'?
                    <div>
                        <Checkbox
                            className="extractTxt"
                            label="Index as txt instead of pdf"
                            checked={extractText}
                            onChange={(checked) => setExtractText(checked!)}
                        />
                    </div> : ""}
                {file && additionalShown? <Select
                    className="uploadParam"
                    value={separator}
                    onChange={(_, value) => changeSeparator(value)}
                    startDecorator={
                        <Fragment>
                            <span className="dividerText">Separator</span>
                            <Divider orientation="vertical" className="divider"/>
                        </Fragment>
                    }>
                    <Option value="line">Line</Option>
                    <Option value="paragraph">Paragraph</Option>
                </Select> : ""}
                {file && additionalShown? <Input
                    className="uploadParam"
                    type="number"
                    placeholder=""
                    value={chunkSize}
                    onChange={(event) => changeChunkSize(event)}
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
                    placeholder=""
                    value={chunkOverlap}
                    onChange={(event) => changeChunkOverlap(event)}
                    startDecorator={
                        <Fragment>
                            <span className="dividerText">Chunk Overlap</span>
                            <Divider orientation="vertical" className="divider"/>
                        </Fragment>
                    }>
                </Input>: ""}
                </span>
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