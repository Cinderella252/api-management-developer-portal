import * as React from 'react';
import { Resolve } from '@paperbits/react/decorators';
import { IPopupService, PopupContract } from '@paperbits/common/popups';
import { Query, Operator } from '@paperbits/common/persistence';
import { ViewManager } from '@paperbits/common/ui';
import { CommandBarButton, FontIcon, IIconProps, SearchBox, Stack, Text } from '@fluentui/react';
import { lightTheme } from '../utils/themes';
import { BackButton } from '../utils/components/backButton';
import { PopupDetailsModal } from './popupDetailsModal';

interface PopupsState {
    popups: PopupContract[],
    showPopupDetailsModal: boolean,
    selectedUPopup: PopupContract
}

interface PopupsProps {
    onBackButtonClick: () => void
}

const addIcon: IIconProps = { iconName: 'Add' };
const popupIcon: IIconProps = { iconName: 'Documentation' };

const iconStyles = { width: '16px', color: lightTheme.palette.themePrimary };

export class Popups extends React.Component<PopupsProps, PopupsState> {
    @Resolve('popupService')
    public popupService: IPopupService;

    @Resolve('viewManager')
    public viewManager: ViewManager;

    constructor(props: PopupsProps) {
        super(props);

        this.state = {
            popups: [],
            showPopupDetailsModal: false,
            selectedUPopup: null
        }
    }

    componentDidMount(): void {
        this.searchPopups();
    }

    handlePageDetailsBackButtonClick = (): void => {
        this.setState({ showPopupDetailsModal: false, selectedUPopup: null });
        this.searchPopups();
    }

    searchPopups = async (searchPattern: string = ''): Promise<void> => {
        const query = Query.from().orderBy('title');
        if (searchPattern) {
            query.where('title', Operator.contains, searchPattern);
        }

        const popupsSearchResult = await this.popupService.search(query);
        this.setState({ popups: popupsSearchResult.value });
    }

    renderPopupContent = (popup: PopupContract): JSX.Element => (
        <Stack
            horizontal
            horizontalAlign="space-between"
            verticalAlign="center"
            className="nav-item-outer-stack"
        >
            <Text block nowrap className="nav-item-title">{popup.title}</Text>
            <FontIcon
                iconName="Settings"
                title="Edit"
                style={iconStyles}
                className="nav-item-inner"
                onClick={(event) => {
                    event.stopPropagation();
                    this.setState({ showPopupDetailsModal: true, selectedUPopup: popup })}
                }
            />
        </Stack>
    )

    render(): JSX.Element {
        return <>
            {this.state.showPopupDetailsModal &&
                <PopupDetailsModal
                    popup={this.state.selectedUPopup}
                    onDismiss={this.handlePageDetailsBackButtonClick.bind(this)}
                />
            }
            <BackButton onClick={this.props.onBackButtonClick} />
            <Stack className="nav-item-description-container">
                <Text className="description-text">Add or edit popups - floating windows shown on top of page content. It gets invoked and dismissed by user actions, like clicking or hovering over a link, button, map marker, etc.</Text>
            </Stack>
            <CommandBarButton
                iconProps={addIcon}
                text="Add popup"
                className="nav-item-list-button"
                onClick={() => this.setState({ showPopupDetailsModal: true, selectedUPopup: null })}
            />
            <SearchBox
                ariaLabel="Search popups"
                placeholder="Search popups..."
                onChange={(event, searchValue) => this.searchPopups(searchValue)}
                styles={{ root: { marginTop: 20 } }}
            />
            <div className="objects-list">
                {this.state.popups.map(popup =>
                    <CommandBarButton
                        iconProps={popupIcon}
                        text={popup.title}
                        key={popup.key}
                        className="nav-item-list-button"
                        onRenderText={() => this.renderPopupContent(popup)}
                    />
                )}
            </div>
        </>
    }
}