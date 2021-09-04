import React from 'react'
import { db  } from '../firebase/firebase'
import 'firebase/firestore';
import { deleteProduct , updateProduct ,routeChange } from '../firebase/firebase'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import  { useState } from 'react';
import { Col, Row } from "react-bootstrap";
import './tables.scss'
import './filter.js'
import { Image } from "react-bootstrap";
import imagevar from "../assets/images/signIn.jpg";
import firebase from "firebase";
import  { useEffect} from "react";
import { ITableProps, kaReducer, Table } from 'ka-table';
import { DataType, EditingMode, PagingPosition, SortingMode } from 'ka-table/enums';
import { DispatchFunc } from 'ka-table/types';


(function(document) {
  'use strict';

  var LightTableFilter = (function(Arr) {

    var _input;

    function _onInputEvent(e) {
      _input = e.target;
      var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
      Arr.forEach.call(tables, function(table) {
        Arr.forEach.call(table.tBodies, function(tbody) {
          Arr.forEach.call(tbody.rows, _filter);
        });
      });
    }

    function _filter(row) {
      var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();
      row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
    }

    return {
      init: function() {
        var inputs = document.getElementsByClassName('light-table-filter');
        Arr.forEach.call(inputs, function(input) {
          input.oninput = _onInputEvent;
        });
      }
    };
  })(Array.prototype);

  document.addEventListener('readystatechange', function() {
    if (document.readyState === 'complete') {
      LightTableFilter.init();
    }
  });

})(document);