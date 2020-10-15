import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { Form, Spin, Input, Button, notification, Col, Row } from 'antd'
import Icon from '@ant-design/icons'
import PropTypes from 'prop-types'


// Presentational
import FormWrapper from '../Components/Styled/FormWrapper';

// App theme
import { colors } from '../Themes/Colors';

// App constants
import { AUTH_USER_TOKEN_KEY } from '../Utils/constants';

class LoginContainer extends React.Component{
  state = {
    loading: false
  };

  handleSubmit = (values) => {
    let { username, password } = values;

    this.setState({ loading: true });

    Auth.signIn(username, password)
      .then(user => {

        const { history, location } = this.props;
        const { from } = location.state || {
          from: {
            pathname: '/dashboard'
          }
        };
        console.log(user)
        localStorage.setItem(AUTH_USER_TOKEN_KEY, user.signInUserSession.accessToken.jwtToken);

        notification.success({
          message: 'Succesfully logged in!',
          description: 'Logged in successfully, Redirecting you in a few!',
          placement: 'topRight',
          duration: 1.5
        });

        history.push(from);
      })
      .catch(err => {
        notification.error({
          message: 'Error',
          description: err.message,
          placement: 'topRight'
        });

        console.log(err);

        this.setState({ loading: false });
      });
  };

  render() {
    const { loading } = this.state;

    return (
      <React.Fragment>
        <FormWrapper onFinish={this.handleSubmit} className="login-form">
          <Form.Item name="username" rules={[{
                  required: true,
                  message: 'Please input your username!'
                }]}>
              <Input prefix={<Icon type="user" style={{ color: colors.transparentBlack }} />} placeholder="Username" />
          </Form.Item>
          <Form.Item name='password' rules = {[{
                  required: true,
                  message: 'Please input your password!'
                }]}>
              <Input prefix={<Icon type="lock" style={{ color: colors.transparentBlack }} />}
                type="password"
                placeholder="Password"
              />
          </Form.Item>
          <Form.Item className="text-center">
            <Row type="flex" gutter={16}>
              <Col lg={24}>
                <Link style={{ float: 'right' }} className="login-form-forgot" to="/forgot-password">
                  Forgot password
                </Link>
              </Col>
              <Col lg={24}>
                <Button
                  style={{ width: '100%' }}
                  type="primary"
                  disabled={loading}
                  htmlType="submit"
                  className="login-form-button"
                >
                  {loading ? <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} /> : 'Log in'}
                </Button>
              </Col>
              <Col lg={24}>
                Or <Link to="/signup">register now!</Link>
              </Col>
            </Row>
          </Form.Item>
        </FormWrapper>
      </React.Fragment>
    );
  }
}

LoginContainer.propTypes = {
  form: PropTypes.any
}
export default LoginContainer;