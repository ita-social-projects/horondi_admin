import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen } from '@testing-library/react';
import MaterialAboutDetails from '../material-about-details';
import { mockMaterialBlock, materialsBlock } from './material-about.variables';

jest.mock('react-router', () => ({
  useParams: () => ({
    id: '62013e2fb96ee84338cf5005'
  })
}));

const mockFormComponent = jest.fn();
mockFormComponent.mockImplementation(({ selectedBlock }) => (
  <div>{selectedBlock.title}</div>
));
jest.mock('../../../components/forms/material-about-form', () => (props) => mockFormComponent(props));

describe('MaterialAboutDetails component tests', () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={mockMaterialBlock} addTypename={false}>
        <MaterialAboutDetails />
      </MockedProvider>
    );
  });

  it('Should render the material form', async () => {
    expect(await screen.findByText(materialsBlock.title)).toBeInTheDocument();
  });
});
