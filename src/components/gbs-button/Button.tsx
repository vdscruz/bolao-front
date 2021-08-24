import React from 'react';
import { Button } from 'atomize';
import { createPublicKey } from 'crypto';
import _Buttom from './Button';



type ButtonType = {
    text: string,
    type?: string, // contained (default),  outlined, text
    click?: Function
}

class ButtonClass extends React.Component<ButtonType> {

    text: string;

    //#region
    bg = 'primary'
    hoverBg = 'pvariant'

    textColor = 'onPrimary'
    hoverTextColor = 'onPrimary'

    border = 'none'
    borderColor = 'transparent'
    hoverBorderColor = 'transparent'
    click: any;
    //#endregion

    constructor(props: ButtonType) {
        super(props);
        this.text = props.text;
        this.click = props.click;
        switch (props.type) {
            case 'text': {
                this.bg = 'transparent'
                this.hoverBg = 'transparent'
                this.textColor = 'primary'
                this.hoverTextColor = 'secondary'
                this.border = 'none'
                this.borderColor = 'transparent'
                this.hoverBorderColor = 'transparent'
                break;
            }
            case 'outlined': {
                this.bg = 'transparent'
                this.hoverBg = 'transparent'
                this.textColor = 'primary'
                this.hoverTextColor = 'pvariant'
                this.border = '1px solid'
                this.borderColor = 'primary'
                this.hoverBorderColor = 'pvariant'
                break;
            }
        }
    }

    render() {
        return (
            <Button
                p={{ x: '0.75rem' }}
                m={{ l: '.5rem', r: '.5rem' }}
                bg={this.bg}
                hoverBg={this.hoverBg}
                textColor={this.textColor}
                hoverTextColor={this.hoverTextColor}
                border={this.border}
                borderColor={this.borderColor}
                hoverBorderColor={this.hoverBorderColor}
                onClick={this.click}
            >
                {this.text}
            </Button >
        )
    }
}

export default ButtonClass