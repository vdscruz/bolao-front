import React from 'react';
import { Row, Text } from 'atomize';

type GbsLabelType = {
    text: string,
    withBorder?: boolean
}

class Label extends React.Component<GbsLabelType> {

    text: string
    border: any
    margin: any
    textSize: string

    constructor(props: GbsLabelType) {
        super(props)
        this.text = props.text

        if (props.withBorder) {
            this.border = { b: "1px solid" }
            this.margin = { l: "1rem", r: "1rem", b: "1rem" };
            this.textSize = 'body'
        }
        else {
            this.border = 'none'
            this.margin = { l: ".25rem", r: ".25rem", b: "0rem" };
            this.textSize = 'caption'
        }

    }

    render() {
        return (<>
            <Row m={this.margin} border={this.border} borderColor="onBackground" textColor="onBackground">
                <Text tag="label" textSize={this.textSize}>{this.text}</Text>
            </Row>
        </>)
    }
}


export default Label