import { withStore } from 'store'
import { Link } from 'react-router-dom'
import withStyle from 'react-jss';

const linkStyle = {
    link: {
        display: 'block'
    }
}

class Test extends React.Component {
    render = () => {
        const { classes } = this.props;
        return <div>
            <Link className={classes.link} to="/qqq">qqq</Link>
            <Link className={classes.link} to="/www">www</Link>
            <Link className={classes.link} to="/eee">eee</Link>
            <Link className={classes.link} to="/rrrr">rrr</Link>
            <Link className={classes.link} to="/ttt">ttt</Link>
        </div>
    }
}

export default withStore(withStyle(linkStyle)(Test))