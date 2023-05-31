import React, { useRef, useState } from 'react';
import { ContentState, Editor, EditorState, RichUtils, convertToRaw, convertFromHTML } from 'draft-js';
import { IconButton, Box, Divider } from '@mui/material';
import { BoldOutlined, ItalicOutlined, UnderlineOutlined, OrderedListOutlined, UnorderedListOutlined } from '@ant-design/icons';
import 'draft-js/dist/Draft.css';
import { styled } from '@mui/system';
import { convertToHTML } from 'draft-convert';

const EditorContainer = styled(Box)`
    margin-top: 10px;
    padding: 8px 12px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
`;

const CustomEditor = ({ content, setContent }) => {
    const [editorState, setEditorState] = useState(() => {
        if (content) {
            const blocksFromHTML = convertFromHTML(content);
            const newEditorState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap);
            return EditorState.createWithContent(newEditorState);
        } else {
            return EditorState.createEmpty();
        }
    });

    const inputRef = useRef(null);

    const handleEditorChange = (newEditorState) => {
        setEditorState(newEditorState);

        const contentState = editorState.getCurrentContent();
        setContent(convertToHTML(contentState));
    };

    const handleInlineStyle = (style) => {
        setEditorState(RichUtils.toggleInlineStyle(editorState, style));
    };

    const handleToggleList = (style) => {
        setEditorState(RichUtils.toggleBlockType(editorState, style));
    };

    const hasStyled = (style) => {
        const contentState = editorState.getCurrentContent();
        const selectionState = editorState.getSelection();
        const block = contentState.getBlockForKey(selectionState.getStartKey());
        const blockType = block.getType();
        return blockType === style;
    };

    const handleDivClick = () => {
        inputRef.current.focus();
    };

    return (
        <EditorContainer>
            <Box sx={{ marginBottom: '8px', display: 'flex', gap: '10px' }}>
                <IconButton
                    color={editorState.getCurrentInlineStyle().has('BOLD') ? 'primary' : 'default'}
                    onClick={() => handleInlineStyle('BOLD')}
                >
                    <BoldOutlined />
                </IconButton>
                <IconButton
                    color={editorState.getCurrentInlineStyle().has('ITALIC') ? 'primary' : 'default'}
                    onClick={() => handleInlineStyle('ITALIC')}
                >
                    <ItalicOutlined />
                </IconButton>
                <IconButton
                    color={editorState.getCurrentInlineStyle().has('UNDERLINE') ? 'primary' : 'default'}
                    onClick={() => handleInlineStyle('UNDERLINE')}
                >
                    <UnderlineOutlined />
                </IconButton>
                <IconButton
                    color={hasStyled('ordered-list-item') ? 'primary' : 'default'}
                    onClick={() => handleToggleList('ordered-list-item')}
                >
                    <OrderedListOutlined />
                </IconButton>
                <IconButton
                    color={hasStyled('unordered-list-item') ? 'primary' : 'default'}
                    onClick={() => handleToggleList('unordered-list-item')}
                >
                    <UnorderedListOutlined />
                </IconButton>
                <IconButton color={hasStyled('header-one') ? 'primary' : 'default'} onClick={() => handleToggleList('header-one')}>
                    H1
                </IconButton>
                <IconButton color={hasStyled('header-two') ? 'primary' : 'default'} onClick={() => handleToggleList('header-two')}>
                    H2
                </IconButton>
                <IconButton color={hasStyled('header-three') ? 'primary' : 'default'} onClick={() => handleToggleList('header-three')}>
                    H3
                </IconButton>
                <IconButton color={hasStyled('header-four') ? 'primary' : 'default'} onClick={() => handleToggleList('header-four')}>
                    H4
                </IconButton>
                <IconButton color={hasStyled('header-five') ? 'primary' : 'default'} onClick={() => handleToggleList('header-five')}>
                    H5
                </IconButton>
                <IconButton color={hasStyled('header-six') ? 'primary' : 'default'} onClick={() => handleToggleList('header-six')}>
                    H6
                </IconButton>
            </Box>
            <Divider />
            <Box sx={{ marginTop: '10px', minHeight: '200px', cursor: 'text' }} onClick={handleDivClick}>
                <Editor ref={inputRef} editorState={editorState} onChange={handleEditorChange} width="100%" />
            </Box>
        </EditorContainer>
    );
};

export default CustomEditor;
