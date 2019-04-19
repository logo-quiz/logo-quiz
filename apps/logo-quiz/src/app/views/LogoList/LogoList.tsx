import * as React from 'react';
import './LogoList.scss';
import { RouteComponentProps } from 'react-router';
import { Logo } from '@logo-quiz/models';
import { LogoPreview } from './components/LogoPreview/LogoPreview';

interface MatchParams {
  id: string;
}

interface LogoListProps extends RouteComponentProps<MatchParams> {
}

export class LogoList extends React.Component<LogoListProps> {
  render() {
    const mockLogos: Partial<Logo>[] = [
      {
        _id: '5caea78138027082bee770a8',
        name: 'Logo 1'
      },
      {
        _id: '5caea78138027082bee770a9',
        name: 'Logo 2'
      }
    ];
    const logos = mockLogos.map(logo => (
      <LogoPreview logo={logo} key={logo._id} />
    ));
    return (
      <div className="logos"> {logos} </div>
    );
  }
}
