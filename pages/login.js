import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useRouter } from 'next/router';
import { Row, Col, Form, Input, Button, Checkbox, Radio, Alert } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import login from '../store/actions/loginAction';
import styles from '../styles/Login.module.css';

const Login = ({ login }) => {
  const router = useRouter();
  const [userType, setUserType] = useState('student');
  const [resError, setResError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loginOnClick = async (values) => {
    const { email, password, remember } = values;
    const response = await login(email, password, remember, userType);

    if (response.status === 200) {
      localStorage.setItem('user', JSON.stringify(response.data));
      router.push('/dashboard');
    }

    if (response.status === 401) {
      setResError(true);
      setErrorMessage('Wrong password, please try again.');
    }

    if (response.status === 404) {
      setResError(true);
      setErrorMessage('The user does NOT exist, please contact admin.');
    }
  };

  const userTypeOnChange = (e) => {
    setUserType(e.target.value);
  };

  return (
    <Row justify='center' align='middle'>
      <Col span={12}>
        <Form
          name='normal_login'
          className={styles.loginForm}
          initialValues={{
            remember: true,
          }}
          rules={[
            {
              required: true,
              message: 'Please input your name',
            },
          ]}
          onFinish={loginOnClick}
        >
          <Form.Item style={{ textAlign: 'center' }}>
            <h1>课程管理助手</h1>
          </Form.Item>

          <Form.Item>
            <Radio.Group value={userType} onChange={userTypeOnChange}>
              <Radio.Button value='student'>Student</Radio.Button>
              <Radio.Button value='teacher'>Teacher</Radio.Button>
              <Radio.Button value='manager'>Manger</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name='email'
            rules={[
              {
                type: 'email',
                message: 'Invalid Email Address!',
              },
              {
                required: true,
                message: 'Please input your Email!',
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className='site-form-item-icon' />}
              placeholder='Email'
            />
          </Form.Item>

          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
              {
                min: 4,
                max: 16,
                message: 'Your password must be between 4 and 16 characters!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className='site-form-item-icon' />}
              type='password'
              placeholder='Password'
            />
          </Form.Item>

          <Form.Item name='remember' valuePropName='checked'>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'
            >
              Log in
            </Button>
          </Form.Item>

          {resError ? (
            <Form.Item>
              <Alert message={errorMessage} type='error' closable />
            </Form.Item>
          ) : null}
        </Form>
      </Col>
    </Row>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      login: login,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(Login);
