import os

import time
import traceback
from multiprocessing import Pool
from threading import local

import six
from socketIO_client import SocketIO
from sqlalchemy import event
from sqlalchemy.engine import Engine


thread_local = local()


def uuid1_comb():
    try:
        import ulid

        return ulid.ulid()
    except Exception:
        import uuid

        return uuid.uuid1(node=int(time.time() * 1000))


def get_stack():
    return [
        {"file": t[0], "lineno": t[1], "function": t[2], "line": t[3]}
        for t in traceback.extract_stack()[:-2]
        if t[0].startswith(os.environ.get("DANGERZONE_FILTER", ""))
    ]


def get_profile_context():
    profile_context = getattr(thread_local, "_profile_context", None)
    if profile_context:
        return profile_context

    set_profile_context("Non web request context")
    return thread_local._profile_context


def set_profile_context(path, method=None):
    context = {"id": str(uuid1_comb()), "name": path}
    if method:
        context["method"] = method

    thread_local._profile_context = context


def clear_profile_context():
    profile_context = getattr(thread_local, "_profile_context", None)
    if profile_context:
        del thread_local._profile_context


def _emit(query):
    try:
        _io = SocketIO(os.environ.get("DANGERZONE_HOST", "localhost"), os.environ.get("DANGERZONE_PORT", 8001))
        _io.emit("action", {"type": "ADD_ENTRY", "args": query})
    except Exception:
        pass


pool = Pool()


def emit(query):
    pool.apply_async(_emit, args=(query,))


@event.listens_for(Engine, "before_cursor_execute")
def _before_execute(conn, cursor, statement, parameters, context, executemany):
    thread_local._profiler_query_start_time = time.time()


@event.listens_for(Engine, "after_cursor_execute")
def _after_execute(conn, cursor, clause, parameters, context, executemany):
    try:
        end_time = time.time()
        start_time = getattr(thread_local, "_profiler_query_start_time", end_time)
        duration = end_time - start_time

        stack = get_stack()
        params = getattr(context, "compiled_parameters", [])

        emit(
            {
                "id": str(uuid1_comb()),
                "session": get_profile_context(),
                "text": clause,
                "stack": stack,
                "resultcount": getattr(context, "rowcount", 0),
                "duration": duration,
                "parameters": [{k: str(v) for k, v in six.iteritems(f)} for f in params],
            }
        )

    except Exception:
        pass


@event.listens_for(Engine, "begin")
def _begin(connection, *args, **kwargs):
    try:
        stack = get_stack()
        emit(
            {
                "id": str(uuid1_comb()),
                "session": get_profile_context(),
                "text": "BEGIN",
                "stack": stack,
                "resultcount": 0,
                "duration": 0,
                "parameters": [],
            }
        )
    except Exception:
        pass


@event.listens_for(Engine, "begin_twophase")
def _begin_twophase(connection, xid, *args, **kwargs):
    try:
        stack = get_stack()
        emit(
            {
                "id": str(uuid1_comb()),
                "session": get_profile_context(),
                "text": "BEGIN TWO PHASE {}".format(xid),
                "stack": stack,
                "resultcount": 0,
                "duration": 0,
                "parameters": [],
            }
        )
    except Exception:
        pass


@event.listens_for(Engine, "commit")
def _commit(connection, *args, **kwargs):
    try:
        stack = get_stack()
        emit(
            {
                "id": str(uuid1_comb()),
                "session": get_profile_context(),
                "text": "COMMIT",
                "stack": stack,
                "resultcount": 0,
                "duration": 0,
                "parameters": [],
            }
        )
    except Exception:
        pass


@event.listens_for(Engine, "commit_twophase")
def _commit_twophase(connection, xid, *args, **kwargs):
    try:
        stack = get_stack()
        emit(
            {
                "id": str(uuid1_comb()),
                "session": get_profile_context(),
                "text": "COMMIT TWO PHASE {}".format(xid),
                "stack": stack,
                "resultcount": 0,
                "duration": 0,
                "parameters": [],
            }
        )
    except Exception:
        pass


@event.listens_for(Engine, "prepare_twophase")
def _prepare_twophase(connection, xid, *args, **kwargs):
    try:
        stack = get_stack()
        emit(
            {
                "id": str(uuid1_comb()),
                "session": get_profile_context(),
                "text": "PREPARE TWO PHASE {}".format(xid),
                "stack": stack,
                "resultcount": 0,
                "duration": 0,
                "parameters": [],
            }
        )
    except Exception:
        pass


@event.listens_for(Engine, "release_savepoint")
def _release_savepoint(connection, name, *args, **kwargs):
    try:
        stack = get_stack()
        emit(
            {
                "id": str(uuid1_comb()),
                "session": get_profile_context(),
                "text": "RELEASE SAVEPOINT {}".format(name),
                "stack": stack,
                "resultcount": 0,
                "duration": 0,
                "parameters": [],
            }
        )
    except Exception:
        pass


@event.listens_for(Engine, "rollback")
def _rollback(connection, *args, **kwargs):
    try:
        stack = get_stack()
        emit(
            {
                "id": str(uuid1_comb()),
                "session": get_profile_context(),
                "text": "ROLLBACK",
                "stack": stack,
                "resultcount": 0,
                "duration": 0,
                "parameters": [],
            }
        )
    except Exception:
        pass


@event.listens_for(Engine, "rollback_savepoint")
def _rollback_savepoint(connection, name, *args, **kwargs):
    try:
        stack = get_stack()
        emit(
            emit,
            args=(
                {
                    "id": str(uuid1_comb()),
                    "session": get_profile_context(),
                    "text": "ROLLBACK {}".format(name),
                    "stack": stack,
                    "resultcount": 0,
                    "duration": 0,
                    "parameters": [],
                },
            ),
        )
    except Exception:
        pass


@event.listens_for(Engine, "rollback_twophase")
def _rollback_twophase(connection, xid, *args, **kwargs):
    try:
        stack = get_stack()
        emit(
            {
                "id": str(uuid1_comb()),
                "session": get_profile_context(),
                "text": "ROLLBACK {}".format(xid),
                "stack": stack,
                "resultcount": 0,
                "duration": 0,
                "parameters": [],
            }
        )
    except Exception:
        pass


@event.listens_for(Engine, "savepoint")
def _savepoint(connection, name, *args, **kwargs):
    try:
        stack = get_stack()
        emit(
            emit,
            args=(
                {
                    "id": str(uuid1_comb()),
                    "session": get_profile_context(),
                    "text": "SAVEPOINT {}".format(name),
                    "stack": stack,
                    "resultcount": 0,
                    "duration": 0,
                    "parameters": [],
                },
            ),
        )
    except Exception:
        pass


class profile_middleware(object):
    def __init__(self, get_response=None):
        self.get_response = get_response

    def __call__(self, request):
        self.process_request(request)
        response = self.get_response(request)
        response = self.process_response(request, response)
        return response

    def process_request(self, request):
        set_profile_context(request.path, request.method)

    def process_response(self, request, response):
        clear_profile_context()
        return response
