import { MiniRadio } from './basics/mini-radio';
import { VisibilityFilter } from './test-support/domain/types';

import * as React from 'react';
export interface Props {
    visibilityFilter: string;
    onVisibilityChanged: any;
}

class VisibilitySelector extends React.Component<Props> {
    public render() {
        const { onVisibilityChanged, visibilityFilter } = this.props;
        return (
            <div>
                {Object.keys(VisibilityFilter).map((key: any, index) => {
                    return (
                        <span key={index}>
                            <MiniRadio
                                visibilityFilter={visibilityFilter}
                                value={VisibilityFilter[key]}
                                onVisibilityChanged={onVisibilityChanged}
                            />
                            {VisibilityFilter[key]}
                        </span>
                    );
                })}
            </div>
        );
    }
}

export default VisibilitySelector;
