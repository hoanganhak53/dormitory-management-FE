import React, { useState } from 'react';
import { Grid, Slider } from '@mui/material/index';
import { styled } from '@mui/system';
import { Tooltip } from '@mui/material/index';

const Square = styled(Grid)`
    border: 1px solid #f0f0f0;
    width: 50px;
    height: auto;
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
    ${({ pointer }) => (pointer ? 'cursor: pointer;' : 'cursor: not-allowed;')}
    background-color: ${({ color }) => color};
    color: #000000;
`;

export const valueMatrix = (value) => {
    return value;
};

const MatrixSelect = ({ matrix, setElement }) => {
    const [selected, setSelected] = useState([]);
    const [sliderValue, setSliderValue] = useState(0.4);

    const initSliderValue = (i, j) => {
        if (i && j) {
            return matrix[i][j];
        }
        return 0.4;
    };

    const clickSquare = (e, index) => {
        if (e < index) {
            setSelected([e, index]);
            setSliderValue(initSliderValue(e, index));
        }
    };

    const renderColor = (i, j) => {
        if (i == selected[0] && j == selected[1]) {
            return '#91d5ff';
        }
        if (i == j) {
            return '#8c8c8c';
        } else if (i > j) {
            return '#bfbfbf';
        } else {
            return '#ffffff';
        }
    };

    return (
        <Grid container direction="row" justifyContent="space-between" alignItems="center" px={5}>
            <Grid container sx={{ width: '70%' }}>
                {Object.keys(matrix).map((e) => (
                    <Grid key={e} container>
                        {matrix[e].map((square, index) => {
                            return (
                                <Tooltip key={`${e}${index}`} title={`Câu ${e * 1 + 1} và ${index + 1}`} placement="top">
                                    <Square
                                        pointer={e < index ? 1 : 0}
                                        item
                                        color={renderColor(e, index)}
                                        onClick={() => clickSquare(e, index)}
                                    >
                                        {e != index && <>{square}</>}
                                    </Square>
                                </Tooltip>
                            );
                        })}
                    </Grid>
                ))}
            </Grid>
            <Grid container sx={{ height: `${40 * Object.keys(matrix).length}px`, width: '25%' }} justifyContent="end">
                <Slider
                    aria-label="Answers"
                    orientation="vertical"
                    getAriaValueText={valueMatrix}
                    valueLabelDisplay="auto"
                    value={sliderValue}
                    onChange={(e) => {
                        setSliderValue(e.target.value);
                        setElement(selected[0], selected[1], e.target.value);
                    }}
                    step={0.1}
                    min={0}
                    max={1}
                    disabled={selected[0] && selected[1] ? false : true}
                />
            </Grid>
        </Grid>
    );
};

export default MatrixSelect;
