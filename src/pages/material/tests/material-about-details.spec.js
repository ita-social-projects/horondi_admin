import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import { render, screen, act } from '@testing-library/react';
import MaterialAboutDetails from '../material-about-details';
import { mockMaterialBlock, materialsBlock } from './material-about.variables';

const mockUseParams = jest.fn();
mockUseParams
  .mockReturnValueOnce('error13e2f')
  .mockReturnValueOnce('error13e2f')
  .mockReturnValue('62013e2fb96ee84338cf5005');

const mockUseHistory = jest.fn();
jest.mock('react-router', () => ({
  useParams: () => ({ id: mockUseParams() }),
  useHistory: () => ({ push: mockUseHistory })
}));

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch
}));

const mockFormComponent = jest.fn();
mockFormComponent.mockImplementation(({ selectedBlock }) => (
  <div>{selectedBlock.title}</div>
));
jest.mock(
  '../../../components/forms/material-about-form',
  () => (props) => mockFormComponent(props)
);

describe('MaterialAboutDetails component tests', () => {
  beforeEach(() => {
    render(
      <MockedProvider mocks={mockMaterialBlock} addTypename={false}>
        <MaterialAboutDetails />
      </MockedProvider>
    );
  });

  it('Should handle an error', async () => {
    await act(async () => new Promise((resolve) => setTimeout(resolve, 0)));
    expect(mockDispatch).toHaveBeenCalled();
    expect(mockUseHistory).toHaveBeenCalled();
  });
  it('Should render the material form', async () => {
    expect(await screen.findByText(materialsBlock.title)).toBeInTheDocument();
  });
});
