import withStyle from 'react-jss'

const mainLayoutStyle = {

}

class MainLayout extends React.Component {
    render = () => {
        const { children, className } = this.props;
        return <div className={`${className}`}>
            {children}
        </div>
    }
}

export default MainLayout;