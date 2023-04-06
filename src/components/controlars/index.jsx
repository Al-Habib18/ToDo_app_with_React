import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";

import SearchPanel from "./search-panel";
import FilterController from "./filter-controller";
import ViewControl from "./view-controller";
import BulkController from "./bulk-controller";

const Controller = ({
    term,
    view,

    changeView,
    handleSearch,

    toggleForm,
    handleFilter,

    clearSelected,
    clearCompleted,
    reset
}) => {
    return (
        <div className=" ">
            <SearchPanel
                term={term}
                handleSearch={handleSearch}
                toggleForm={toggleForm}
            />
            <Row className=" my-2  ">
                <Col md={{ size: 4 }} className="mt-2">
                    <FilterController handleFilter={handleFilter} />
                </Col>

                <Col md={{ size: 4 }} className="mt-3">
                    <ViewControl view={view} changeView={changeView} />
                </Col>

                <Col md={{ size: 4 }} className="d-flex ">
                    <div className="ml-auto">
                        <BulkController
                            clearSelected={clearSelected}
                            clearCompleted={clearCompleted}
                            reset={reset}
                        />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

Controller.propTypes = {
    term: PropTypes.string.isRequired,
    view: PropTypes.string.isRequired,
    changeView: PropTypes.func.isRequired,

    handleSearch: PropTypes.func.isRequired,
    toggleForm: PropTypes.func.isRequired,
    handleFilter: PropTypes.func.isRequired,

    clearSelected: PropTypes.func.isRequired,
    clearCompleted: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
};

export default Controller;
