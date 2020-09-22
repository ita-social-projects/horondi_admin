import React from 'react';
import PropTypes from 'prop-types'
import {Button} from "@material-ui/core";
import PublishIcon from "@material-ui/icons/Publish";
import { useStyles } from './upload-button-container.styles'

const UploadButtonContainer = ({ onChangeHandler, multiple, startIcon, buttonLabel }) => {
    const styles = useStyles()

    return (
        <div>
            <input
                accept='image/*'
                className={styles.input}
                id={buttonLabel}
                multiple={multiple}
                type='file'
                onChange={onChangeHandler}
            />
            <label htmlFor={buttonLabel}>
                <Button
                    className={styles.uploadBtn}
                    component='span'
                    variant='contained'
                    color='primary'
                    startIcon={startIcon && <PublishIcon />}
                >
                    {buttonLabel}
                </Button>
            </label>
        </div>
    );
};

UploadButtonContainer.propTypes = {
    onChangeHandler: PropTypes.func.isRequired,
    buttonLabel: PropTypes.string.isRequired,
    multiple: PropTypes.bool,
    startIcon: PropTypes.bool
}

UploadButtonContainer.defaultProps = {
    multiple: false,
    startIcon: false
}

export default UploadButtonContainer;