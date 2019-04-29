import React, { Component } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import withStyles from "@material-ui/core/styles/withStyles";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';
import {withRouter} from "react-router";
import dashboardStyle from "../Dash/Dashboard/styles/dashboardStyle.jsx";
import {connect} from "react-redux";
import Loader from '../Main/Loader';
import loader from '../../images/loaders/bars-loader.gif';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const DialogTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500],
    },
}))(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const style = {
    scrollPaper:{
        maxHeight: '100%'
    },
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    }
}

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class Test extends Component {


    constructor(props){

        super(props);

        this.state = {
            numPages: null,
            pageNumber: 1,
            open: true,
            canvasZoomW: null,
            canvasZoomH: null,
            hide: false,
            fullScreenMode: false,
            initialSize: null,
            TimeDown: 0,
            TimeUp: 0

        }

    }

    onDocumentLoadSuccess = ({ numPages }) => {


        this.setState({ numPages });

    }

    changePageNext = () => {

        console.log(this.state.pageNumber);
        console.log(this.state.numPages);

        console.log(this.state.canvasZoomW);

        const canvasStyle = document.getElementsByClassName('react-pdf__Page__canvas');

        if (this.state.pageNumber + 1 <= this.state.numPages) {

            console.log("WTFFFFFF");
            this.setState({pageNumber: this.state.pageNumber + 1});

        }

        if (this.props.mode === "tableau") {

            canvasStyle[0].style['width'] = this.state.canvasZoomW;
            canvasStyle[0].style['height'] = this.state.canvasZoomH;

            console.log(canvasStyle[0].style['width']);
        }

    }

    changePagePrev = () => {

        console.log("COUCOU");


        if (this.state.pageNumber - 1 > 0) {


            this.setState({pageNumber: this.state.pageNumber - 1});

        }



    }

    onPageLoadSuccess = ({ numPages }) => {


            const test = document.getElementsByClassName('react-pdf__Page__canvas');

            test[0].style['margin'] = '0 auto';

        if (this.props.mode === "tableau") {

            this.setState({canvasZoom: test[0].style['width']});

            if (!this.state.fullScreenMode) {
                this.setState({initialSize: parseInt(test[0].style['width'])});
            }

            if (this.state.fullScreenMode) {
                test[0].style['width'] = this.state.canvasZoomW;
                test[0].style['height'] = this.state.canvasZoomH;
            }
        }

    }

    renderLoading = () => {

        return (
            <DialogContent>
                <img alt='chargement' src={loader} style={{display: 'inherit', margin: '0 auto'}} />
            </DialogContent>
        );
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    zoomCanvasPlus = () => {

        const canvasStyle = document.getElementsByClassName('react-pdf__Page__canvas');

        var wi = parseInt(this.state.canvasZoom) + 100;

        if (wi < window.innerWidth){

            canvasStyle[0].style['height'] = '';

            console.log(wi.toString());

            canvasStyle[0].style['width'] = wi.toString() + 'px';

            this.state.canvasZoom = canvasStyle[0].style['width'];

            console.log(this.state.canvasZoom);
        }

        this.state.canvasZoomW = canvasStyle[0].style['width'];
        this.state.canvasZoomH = canvasStyle[0].style['height'];

    }

    zoomCanvasMinus = () => {

        const canvasStyle = document.getElementsByClassName('react-pdf__Page__canvas');

        var wi = parseInt(this.state.canvasZoomW) - 100;

        console.log(wi);
        console.log(this.state.initialSize);

        if (wi >= this.state.initialSize){

            console.log("OKKK");

            canvasStyle[0].style['height'] = '';

            console.log(wi.toString());

            canvasStyle[0].style['width'] = wi.toString() + 'px';

            this.state.canvasZoomW = canvasStyle[0].style['width'];
            this.state.canvasZoomH = canvasStyle[0].style['height'];

            console.log(this.state.canvasZoomW);
        }else{
            canvasStyle[0].style['height'] = '';
            this.state.canvasZoomH = canvasStyle[0].style['height'];
        }

        this.state.canvasZoomW = canvasStyle[0].style['width'];
        this.state.canvasZoomH = canvasStyle[0].style['height'];

    }

    fullScreenMode = () => {

        console.log("FULL SCREEN");

        this.setState({fullScreenMode: true});

        const canvasStyle = document.getElementsByClassName('react-pdf__Page__canvas');

        canvasStyle[0].style['width'] = parseInt(window.innerWidth) + "px";
        canvasStyle[0].style['height'] = parseInt(window.innerHeight) + "px";

        this.state.canvasZoomW = canvasStyle[0].style['width'];
        this.state.canvasZoomH = canvasStyle[0].style['height'];

    }

    test = (event) => {


        console.log(event);

        if (this.state.fullScreenMode){

            var posX = event.clientX;

            console.log(posX);

            if (posX > (window.innerWidth / 2)){
                this.changePageNext();
            }
            else if (posX < (window.innerWidth / 2)){
                this.changePagePrev();
            }

        }


    }

    changeScreen = (event) => {

        console.log("COUCOUCOUCU");

        alert("OKKKK");


        const canvasStyle = document.getElementsByClassName('react-pdf__Page__canvas');

        this.state.fullScreenMode = false;

        console.log(this.state.initialSize);

        canvasStyle[0].style['width'] = this.state.initialSize;
        canvasStyle[0].style['height'] = '';

        console.log(canvasStyle[0].style);
    }

    handleButtonPress = (event) => {

        console.log(event.timeStamp);

        this.state.TimeDown = event.timeStamp;

    }

    handleButtonRelease = (event) => {

        console.log(event.timeStamp);

        this.state.TimeUp = event.timeStamp;

        console.log("TS ======= " + (this.state.TimeUp - this.state.TimeDown));

        if ((this.state.TimeUp - this.state.TimeDown) > 2000){
            this.changeScreen();
        }else{
            this.test(event);
        }

    }

    render() {
        const { pageNumber, numPages } = this.state;
        const style = this .props;
        const { classes } = this.props;

        if (this.props.mode === "apercu") {

            return (
                <Dialog
                    onClose={this.handleClose}
                    open={this.state.open}
                    maxWidth={"xl"}
                    className={style.scrollPaper}
                    scroll="body"
                >
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                        Apercu de votre fichier
                    </DialogTitle>
                    <DialogContent>
                        <Document
                            file={this.props.url}
                            onLoadSuccess={this.onDocumentLoadSuccess}
                            loading={this.renderLoading()}
                            onClick={this.zoomCanvas}
                        >
                            <Page pageNumber={this.state.pageNumber} onLoadSuccess={this.onPageLoadSuccess}/>
                        </Document>

                    </DialogContent>

                    <DialogContent>

                        <p style={{textAlign: 'center'}}>Page {pageNumber} sur {numPages}</p>

                    </DialogContent>

                    <DialogContent>

                        {this.state.numPages > 1 ?

                            <div style={{textAlign: 'center'}}>
                                <Button onClick={this.changePagePrev} variant="contained" color="primary"
                                        style={{margin: '2%'}}>
                                    Precedent
                                </Button>
                                <Button onClick={this.handleClose} variant="contained" color="secondary"
                                        style={{margin: '2%'}}>
                                    CHOISIR
                                </Button>
                                <Button onClick={this.changePageNext} variant="contained" color="primary"
                                        style={{margin: '2%'}}>
                                    Suivant
                                </Button>
                            </div>

                            : ""}


                    </DialogContent>

                </Dialog>
            );
        }

        else if (this.props.mode === "tableau"){

            return(
                <div>
                    <Dialog
                        fullScreen
                        open={this.state.open}
                        onClose={this.handleClose}
                        TransitionComponent={Transition}
                        className={style.scrollPaper}
                        scroll="body"

                    >
                        {this.state.fullScreenMode === false ?
                        <AppBar className={classes.appBar}>
                            <Toolbar>
                                <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                                    <CloseIcon />
                                </IconButton>
                                <Typography variant="h6" color="inherit" className={classes.flex}>
                                    Votre fichier
                                </Typography>
                            </Toolbar>
                        </AppBar>
                            : ''}

                        <DialogContent>

                            <Document
                                file={this.props.url}
                                onLoadSuccess={this.onDocumentLoadSuccess}
                                loading={this.renderLoading()}
                                onClick={this.test}
                                onMouseDown={this.handleButtonPress}
                                onMouseUp={this.handleButtonRelease}
                            >

                                <Page pageNumber={this.state.pageNumber} onLoadSuccess={this.onPageLoadSuccess}/>
                            </Document>
                        </DialogContent>

                        {this.state.fullScreenMode === false ?

                        <DialogContent>

                            <p style={{textAlign: 'center'}}>Page {pageNumber} sur {numPages}</p>


                        </DialogContent>
                            : ''}

                        {this.state.fullScreenMode === false ?

                            <DialogContent>

                                {this.state.numPages > 1 ?

                                    <div style={{textAlign: 'center'}}>
                                        <Button onClick={this.changePagePrev} variant="contained" color="primary"
                                                style={{margin: '2%'}}>
                                            Precedent
                                        </Button>
                                        <Button onClick={this.changePageNext} variant="contained" color="primary"
                                                style={{margin: '2%'}}>
                                            Suivant
                                        </Button>

                                        <Button onClick={this.zoomCanvasPlus} variant="contained" color="primary"
                                                style={{margin: '2%'}}>
                                            Zoomer plus
                                        </Button>
                                        <Button onClick={this.zoomCanvasMinus} variant="contained" color="primary"
                                                style={{margin: '2%'}}>
                                            Zoomer moins
                                        </Button>
                                        <Button onClick={this.fullScreenMode} variant="contained" color="primary"
                                                style={{margin: '2%'}}>
                                            Plein ecran
                                        </Button>
                                    </div>

                                    : ""}


                            </DialogContent>
                         : ''}

                    </Dialog>
                </div>
            );
        }
        else{
            return(
                <Loader/>
            );
        }
    }
}

Test.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(dashboardStyle)(Test)));