import {MDCTopAppBar} from '@material/top-app-bar/index';
import {MDCTabBar} from '@material/tab-bar';
import {MDCTextField} from '@material/textfield';
import {MDCRipple} from '@material/ripple';


const topAppBar = new MDCTopAppBar(document.querySelector('.mdc-top-app-bar'));
const tabBar = new MDCTabBar(document.querySelector('.mdc-tab-bar'));

let textFields = [];
document.querySelectorAll('.mdc-text-field').forEach(element => textFields.push(new MDCTextField(element)));

const iconButtonRipple = new MDCRipple(document.querySelector('.mdc-icon-button'));
iconButtonRipple.unbounded = true;
