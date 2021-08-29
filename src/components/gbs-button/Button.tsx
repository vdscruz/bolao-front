import React from 'react';
import { Button, Icon } from 'atomize';
import { createPublicKey } from 'crypto';
import _Buttom from './Button';
import { type } from './../../types/parsed-token';



type ButtonType = {
    text: string,
    type?: string, // contained (default),  outlined, text
    inverted?: boolean,
    click?: Function,
    icon?: string,
    submit?: boolean
}

class ButtonClass extends React.Component<ButtonType> {

    text: string;

    //#region
    bg: string
    hoverBg: string

    textColor: string
    hoverTextColor: string

    border: string
    borderColor: string
    hoverBorderColor: string
    click: any;
    icon: any = undefined;
    //#endregion

    constructor(props: ButtonType) {
        super(props);
        this.text = props.text;
        this.click = props.click;

        //#region 
        switch (props.type) {
            case 'text': {
                this.bg = 'transparent'
                this.hoverBg = 'transparent'
                this.textColor = props.inverted ? 'secondary' : 'primary'
                this.hoverTextColor = props.inverted ? 'primary' : 'secondary'
                this.border = 'none'
                this.borderColor = 'transparent'
                this.hoverBorderColor = 'transparent'
                break;
            }
            case 'outlined': {
                this.bg = 'transparent'
                this.hoverBg = 'transparent'
                this.textColor = props.inverted ? 'secondary' : 'primary'
                this.hoverTextColor = props.inverted ? 'svariant' : 'pvariant'
                this.border = '1px solid'
                this.borderColor = props.inverted ? 'secondary' : 'primary'
                this.hoverBorderColor = props.inverted ? 'svariant' : 'pvariant'
                break;
            }
            default: {
                this.bg = props.inverted ? 'secondary' : 'primary'
                this.hoverBg = props.inverted ? 'svariant' : 'pvariant'

                this.textColor = props.inverted ? 'onSecondary' : 'onPrimary'
                this.hoverTextColor = props.inverted ? 'onSecondary' : 'onPrimary'

                this.border = 'none'
                this.borderColor = 'transparent'
                this.hoverBorderColor = 'transparent'


            }
        }
        //#endregion

        if (props.icon) {
            this.icon = (<Icon name={props.icon} size="16px" color={this.textColor} m={{ r: "0.5rem" }}
            />)
        }

    }

    render() {
        return (
            <Button
                p={{ x: '0.75rem' }}
                m={{ l: '.5rem', r: '.5rem' }}
                h={{ xs: '2rem' }}
                prefix={this.icon}
                bg={this.bg}
                hoverBg={this.hoverBg}
                textColor={this.textColor}
                hoverTextColor={this.hoverTextColor}
                border={this.border}
                borderColor={this.borderColor}
                hoverBorderColor={this.hoverBorderColor}
                onClick={this.click}
                type={this.props.submit ? 'submit' : 'button'}
            >
                {this.text}
            </Button >
        )
    }
}

export default ButtonClass