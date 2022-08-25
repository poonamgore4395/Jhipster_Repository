import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICountry } from 'app/shared/model/country.model';
import { getEntities } from './country.reducer';

export const Country = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const countryList = useAppSelector(state => state.country.entities);
  const loading = useAppSelector(state => state.country.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="country-heading" data-cy="CountryHeading">
        <Translate contentKey="jhipstermyfirstappApp.country.home.title">Countries</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="jhipstermyfirstappApp.country.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to="/country/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="jhipstermyfirstappApp.country.home.createLabel">Create new Country</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {countryList && countryList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="jhipstermyfirstappApp.country.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipstermyfirstappApp.country.countryName">Country Name</Translate>
                </th>
                <th>
                  <Translate contentKey="jhipstermyfirstappApp.country.region">Region</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {countryList.map((country, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/country/${country.id}`} color="link" size="sm">
                      {country.id}
                    </Button>
                  </td>
                  <td>{country.countryName}</td>
                  <td>{country.region ? <Link to={`/region/${country.region.id}`}>{country.region.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/country/${country.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/country/${country.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`/country/${country.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="jhipstermyfirstappApp.country.home.notFound">No Countries found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Country;
