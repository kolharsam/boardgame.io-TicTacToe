import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Button, { ButtonGroup } from '@atlaskit/button';
import MainSection from '../components/MainSection';
import ContentWrapper from '../components/ContentWrapper';
import PageTitle from '../components/PageTitle';
import TicTicGame from '../components/TicTicGame'


export default class HomePage extends Component {
  static contextTypes = {
    showModal: PropTypes.func,
    addFlag: PropTypes.func,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func,
    onClose: PropTypes.func,
  };

  render() {
    return (
      <div style={{height: '100vh'}}>
        <ContentWrapper>
          <PageTitle>Welcome to Massive Tic Tac Toe Game</PageTitle>
          <MainSection />
          <ButtonGroup>
            <Button style={{marginBottom: '30px'}}
              appearance="primary"
              onClick={this.context.showModal}
              onClose={() => { }}
            >This is an example modal.</Button>
            <Button onClick={this.context.addFlag}>this is an example flag.</Button>
          </ButtonGroup>
          <TicTicGame />
        </ContentWrapper>
      </div>
    );
  }
}
