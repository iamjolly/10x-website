import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Head from "routes/Head";
import classnames from "classnames";
import { getPage } from "app/ContentModule";
import FourOhFour from "routes/FourOhFour";
import { Col, Grid, Row } from "components/Grid";
import Loading from "components/Loading";
import Links from "./Links";
import Nav from "./Nav";
import Icon from "components/Icon";
import Break from "components/Break";
import Card from "components/Card";
import Mdx from "features/Mdx";
import useScrollToTop from "utils/useScrollToTop";
import ByTheNumbersGraphic from "features/Layout/templates/ByTheNumbersGraphic";
import ReportTable from "features/Layout/templates/ReportTable";

const Report = ({ type }) => {
  const dispatch = useDispatch();
  const { name } = useParams();
  useEffect(() => {
    dispatch(getPage({ type, name }));
  }, [dispatch, name, type]);
  useScrollToTop();
  const page = useSelector((state) => state.content.page);
  const { pending, data, error } = page;

  if (pending) {
    return (
      <Grid>
        <Head title="Loading..." />
        <div style={{ paddingTop: "15vh", paddingBottom: "15vh" }}>
          <Loading isLoading={true}>
            <span />
          </Loading>
        </div>
      </Grid>
    );
  }
  if (error) {
    return <FourOhFour pathname={name} />;
  }

  return (
    <div className={`TxContent`}>
      <div className="usa-app__bg">
        <Head title={data.title} />
        <Grid
          className={classnames({
            TxReport: true,
            [`TxReport--${name}`]: true,
            [`TxReport--template-${data.template}`]: Boolean(data.template),
          })}
        >
          <Row gap="1" className="report-content">
            <Col size="12" desktop="8">
              <h1 className="TxReport__title">{data.title}</h1>
              <p className="TxReport__intro">{data.intro}</p>
            </Col>
          </Row>
          <Row gap="4">
            <Col size="12" desktop="3">

              <div id="nav-sticky" className="nav-sticky">
                <h4 className="TxReport__nav-header">{data.navHeader}</h4>
                <div className="TxLinks">
                  {data.nav && (
                    <ul>
                      {data.nav.map((item, i) => (
                        <li className="TxLinks__item">
                          <a href={item.link}>{item.text}</a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

            </Col>
            <Col size="12" desktop="9" className="TxReport__content">
              {data.sections && (
                <div>
                  {data.sections.map((item, i) => (
                    <section>
                      <Break color="accent-green" variant="extra-wide" />
                      <h2 id={item.target}>{item.title}</h2>
                      
                      {item.impact &&
                        <Mdx>{item.impact}</Mdx>
                      }

                      {item.byTheNumbersStats &&
                        <div>
                          <ByTheNumbersGraphic heading={item.byTheNumbersHeading} stats={item.byTheNumbersStats} />
                        </div>
                      }

                      <Mdx>{item.content}</Mdx>

                      {item.the10xTeam &&
                        <div className={item.the10xTeam}></div>
                      }

                      {item.reportTableData &&
                        <div>
                          <ReportTable heading={item.reportTableHeading} headers={item.reportTableHeaders} data={item.reportTableData} />
                        </div>
                      }

                    </section>
                  ))}
                </div>
              )}
            </Col>
          </Row>
        </Grid>
      </div>
    </div>
  );
};

window.addEventListener('DOMContentLoaded', () => {

  (function () {

    function init() {
      doSmoothScrolling();
      doActiveNav();
    }

    function doSmoothScrolling() {
      document.querySelectorAll("#nav-sticky ul li a").forEach(link => {

        link.addEventListener("click", event => {
          event.preventDefault();
          let target = document.querySelector(event.target.hash);
          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        });
      });
    }

    function doActiveNav() {
      let fromTopVar = 400; // On scroll, adjust the nav active state / section vertical position

      window.addEventListener("scroll", event => {
        let fromTop = window.scrollY;
        document.querySelectorAll("#nav-sticky ul li a").forEach(link => {
          let header = document.querySelector(link.hash);
          let section = header.parentElement;
          if (
            section.offsetTop <= (fromTop - fromTopVar) &&
            section.offsetTop + section.offsetHeight > (fromTop - fromTopVar)
          ) {
            link.parentElement.classList.add("active");
          } else {
            link.parentElement.classList.remove("active");
          }
        });
      });
    }

    init();
  })();
});








Report.defaultProps = { type: "report", name: "" };

Report.propTypes = {
  type: PropTypes.string,
};

export default Report;
