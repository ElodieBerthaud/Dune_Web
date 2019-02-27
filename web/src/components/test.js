import React, { Component } from 'react';
import { Document, Page } from 'react-pdf/dist/pdf.worker.entry.js';

class test extends Component{

    state = {
        numPages: null,
        pageNumber: 1,
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    }

    goToPrevPage = () =>
        this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
    goToNextPage = () =>
        this.setState(state => ({ pageNumber: state.pageNumber + 1 }));

    render() {
        const { pageNumber, numPages } = this.state;

        return (
            <div>
                <nav>
                    <button onClick={this.goToPrevPage}>Prev</button>
                    <button onClick={this.goToNextPage}>Next</button>
                </nav>

                <div>
                <Document
                    file="./2020_PLD_Dune201902KOV2.pdf"
                    onLoadSuccess={this.onDocumentLoadSuccess.bind(this)}
                >
                    <Page pageNumber={pageNumber} width={600} />
                </Document>
                </div>


                <p>
                    Page {pageNumber} of {numPages}
                </p>
            </div>
        );
    }


}

export default test;