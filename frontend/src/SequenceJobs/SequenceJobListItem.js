import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { ConfirmFlagsDialog } from '../Modals/ModalDialog';
import { Table, Button, Progress } from 'semantic-ui-react';


const descriptionComponent = sequenceJob => <span>{sequenceJob.description}</span>

const statusComponent = sequenceJob => {
    let count = 1;
    let progress = sequenceJob.status === 'finished' ? 1 : 0;
    if(sequenceJob.type === 'shots' && sequenceJob.status !== 'idle') {
        count = sequenceJob.count;
        progress = sequenceJob.progress;
    }

    let style;
    switch(sequenceJob.status) {
        case 'finished':
            style={ success: true }; break;
        case 'error':
            style={ error: true }; break;
        case 'running':
            style={ active: true }; break;
        default:
            style= { disabled: true };
    }
    let progressLabel = progress > 0 ? `: ${progress}/${count}` : '';
    return (
        <Progress {...style} total={count} size="small" value={progress}>
            {sequenceJob.status + progressLabel}
        </Progress>
    )
}

const SequenceJobImagesButton = withRouter( ({history, sequenceJob}) => (
    <Button title="Images" size="small" onClick={() => history.push(`/sequences/${sequenceJob.sequence}/items/${sequenceJob.id}/images`) } icon='image' />
))



export class SequenceJobListItem extends React.Component {
    moveUp = () => this.props.moveSequenceJob(this.props.sequenceJob, 'up');
    moveDown = () => this.props.moveSequenceJob(this.props.sequenceJob, 'down');
    duplicate = () => this.props.duplicateSequenceJob(this.props.sequenceJob);
    remove = flags => this.props.deleteSequenceJob(this.props.sequenceJob, flags);
    reset = flags => this.props.resetSequenceJob(this.props.sequenceJob, flags);

    render = () => {
        const { sequenceJob, canEdit, canMoveUp, canMoveDown, canReset } = this.props;
        return (
            <Table.Row key={sequenceJob.id}>
                <Table.Cell>{sequenceJob.typeLabel}</Table.Cell>
                <Table.Cell>{descriptionComponent(sequenceJob)}</Table.Cell>
                <Table.Cell width={3}>{statusComponent(sequenceJob)}</Table.Cell>
                <Table.Cell>
                    <Button.Group icon>
                        <Button as={Link} to={`/sequences/${sequenceJob.sequence}/items/${sequenceJob.id}`} icon='edit' title="Edit" size="small" disabled={!canEdit} />
                        <ConfirmFlagsDialog
                            trigger={<Button title="Remove" size="small" icon='remove' disabled={!canEdit} />}
                            header='Confirm removal'
                            resetState={true}
                            cancelButton='no'
                            confirmButton='yes'
                            onConfirm={this.remove}
                            content='Do you really want to remove this element?'
                            size='mini'
                            basic
                            centered={false}
                            flags={sequenceJob.has_files ? [
                                {
                                    name: 'remove_files',
                                    label: 'Also remove all saved files',
                                },
                            ] : []}

                        />
                        <Button title="Move up" size="small" disabled={!canMoveUp} onClick={this.moveUp} icon='angle up' />
                        <Button title="Move down" size="small" disabled={!canMoveDown} onClick={this.moveDown} icon='angle down' />
                        <Button title="Duplicate" size="small" onClick={this.duplicate} icon='copy' />
                        <ConfirmFlagsDialog
                            trigger={<Button title="Reset" size="small" icon='redo' disabled={!canReset} />}
                            header='Confirm reset'
                            resetState={true}
                            cancelButton='no'
                            confirmButton='yes'
                            onConfirm={this.reset}
                            content='Do you really want to reset this job?'
                            size='mini'
                            basic
                            centered={false}
                            flags={[
                                {
                                    name: 'reset_following',
                                    label: 'Also reset following jobs',
                                },
                                {
                                    name: 'remove_files',
                                    label: 'Also remove all saved files',
                                },
                            ]}

                        />
                        { sequenceJob.saved_images && sequenceJob.saved_images.length > 0 && <SequenceJobImagesButton sequenceJob={sequenceJob} /> }
                    </Button.Group>
                </Table.Cell>
            </Table.Row>
        )
    }
}
